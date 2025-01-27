import { Op, where } from "sequelize"
import db from "../db/models"
import passport from "passport"
import crypto from 'crypto'
import { checkGameResult } from "../utils/helpers.js"
import { uploadFileInCloudinary } from '../utils/cloudinary.js'
import { emitSocketEvent } from "../socket/index.js"
import redis from '../utils/redis.js'

const userSignUpController = async (req, res) => {
  const { username, email, password } = req.body
  console.log(req.body)
  const myUser = await db.User.findOne({
    where: {
      [Op.or]: [{ userName: username, email: email }]
    }
  })
  if (myUser) {
    res.status(400).send({
      message: 'user already exist with same username or email'
    })
  }
  const newUser = await db.User.create({ userName: username, email, password })
  console.log(newUser);
  res.status(400).send({
    message: 'user created successfully'
  })
}


const userLoginController = async (req, res, next) => {
  try {
    passport.authenticate('local', (err, details) => {
      console.log(err);
      if (err) {
        res.status(400).send({
          message: err
        })
      }
      console.log(details);
      if (details) {
        res.status(200).send({
          message: 'User Logged in Successfully',
          user: {
            ...details.dataValues,
            token: details.token
          }
        })
      }
    })(req, res)
  } catch (err) {
    console.log(err);
  }
  // res.send('hello')
}

const createGameController = async (req, res) => {
  const { userId } = { ...req.body, ...req.user }

  try {


    const gameDetails = await db.Games.create({
      playerOne: userId,
      status: 'pending'
    })



    res.status(200).send({
      message: 'Game Created Successfully',
      data: {
        gameId: gameDetails?.dataValues?.gameId
      }
    })
  } catch (err) {

    res.status(500).send({
      message: 'Unable To Create Game'
    })
  }


}

const getGameCodeController = async (req, res) => {
  const { gameId } = { ...req.body, ...req.user, ...req.query }

  try {


    const gameExis = await db.Games.findOne({
      where: {
        gameId
      },
      include: [
        {
          model: db.User, // Associated User model
          as: 'playerOneUser', // Alias defined in the association
          attributes: ['userId', 'userName', 'email'], // Select specific fields from Users table
        },
        {
          model: db.User, // Associated User model
          as: 'playerTwoUser', // Alias defined in the association
          attributes: ['userId', 'userName', 'email'], // Select specific fields from Users table
        },
      ],
      attributes: ['playerOne', 'status'],
    })
    console.log('gameExis ----------', gameExis);

    if (!gameExis) {
      res.status(200).send({
        message: 'Game Not Found',
        data: {
          type: 'game-result',
          status: 'game-over',
          reason: `Game Not Found`
        }
      })
      return
    }

    if (gameExis.dataValues.status === 'completed') {
      res.status(200).send({
        message: 'Game Already Completed',
        data: {
          type: 'game-result',
          status: 'game-over',
          reason: `Game Is Over`
        }
      })
      return
    }

    let gameSign = `${gameId}-${gameExis?.dataValues?.playerOne}`
    const hashForRelaxSign = crypto.createHash('md5')
    hashForRelaxSign.update(gameSign)
    gameSign = hashForRelaxSign.digest('hex')

    await db.Games.update({
      gameCode: gameSign
    },
      {
        where: {
          gameId
        }
      })

    gameExis['gameCode'] = gameSign

    res.status(200).send({
      message: 'Game Code Fetched Successfully',
      data: {
        gameDetails: gameExis
      }
    })
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: 'Unable To Fetch Game Code'
    })
  }


}

const joinGameController = async (req, res) => {
  const { userId, gameCode } = { ...req.body, ...req.user }

  try {

    const gameExist = await db.Games.findOne({
      where: {
        gameCode
      },
      attributes: ['gameId'],
      raw: true
    })

    if (!gameExist) {
      res.status(400).send({
        message: 'No Such Game Avilable With This Code'
      })
    }

    console.log(gameExist);


    await db.Games.update({
      playerTwo: userId
    },
      {
        where: {
          gameId: gameExist?.gameId
        }
      })


    res.status(200).send({
      message: 'Game Joined Successfully',
      data: {
        gameId: gameExist?.gameId
      }
    })
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: 'Unable To Join Game'
    })
  }


}

const startGameController = async (req, res) => {
  const { gameId, userId } = { ...req.body, ...req.user }

  try {


    await db.Games.update({
      status: 'inProgress'
    }, {
      where: {
        gameId
      }
    })

    const gameExis = await db.Games.findOne({
      where: {
        gameId
      },
      include: [
        {
          model: db.User, // Associated User model
          as: 'playerOneUser', // Alias defined in the association
          attributes: ['userId', 'userName', 'email'], // Select specific fields from Users table
        },
        {
          model: db.User, // Associated User model
          as: 'playerTwoUser', // Alias defined in the association
          attributes: ['userId', 'userName', 'email'], // Select specific fields from Users table
        },
      ],
      attributes: ['playerOne'],
    })

    const gameMoves = [[null, null, null], [null, null, null], [null, null, null]]

    await redis.set(`game-round-${gameId}`, JSON.stringify(gameMoves))

    await redis.set(`${gameId}-move-by`, JSON.stringify(gameExis?.playerTwoUser?.userId))

    emitSocketEvent(req, '/game-update', `game-${gameId}`, 'notification',
      {
        type: 'game-move',
        gameMoves: gameMoves,
        moveBy: gameExis?.playerTwoUser?.userId,
        value: null
      }
    )

    res.status(200).send({
      message: 'Game Started Successfully'
    })

  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: 'Unable To Start Game'
    })
  }


}

const gameMoveController = async (req, res) => {
  const { gameId, indexOfX, indexOfY, value, userId } = { ...req.body, ...req.user }

  try {

    let gameMoves = await redis.get(`game-round-${gameId}`)
    gameMoves = JSON.parse(gameMoves)
    gameMoves[indexOfX][indexOfY] = value

    await redis.set(`game-round-${gameId}`, JSON.stringify(gameMoves))
    await redis.set(`${gameId}-move-by`, JSON.stringify(userId))

    const { gameStatus } = checkGameResult(gameMoves)

    emitSocketEvent(req, '/game-update', `game-${gameId}`, 'notification',
      {
        type: 'game-move',
        gameMoves: gameMoves,
        moveBy: userId,
        value
      }
    )
    if (gameStatus === 'win') {

      const gameDetails = await db.Games.findOne({
        where: {
          gameId
        },
        include: [
          {
            model: db.User, // Associated User model
            as: 'playerOneUser', // Alias defined in the association
            attributes: ['userId', 'userName'], // Select specific fields from Users table
          },
          {
            model: db.User, // Associated User model
            as: 'playerTwoUser', // Alias defined in the association
            attributes: ['userId', 'userName'], // Select specific fields from Users table
          },
        ],
        raw: true
      })

      emitSocketEvent(req, '/game-update', `game-${gameId}`, 'notification',
        {
          type: 'game-result',
          status: 'win',
          winBy: userId
        }
      )
    } else if (gameStatus === 'draw') {
      emitSocketEvent(req, '/game-update', `game-${gameId}`, 'notification',
        {
          type: 'game-result',
          status: 'draw'
        }
      )
    }

    if (gameStatus === 'draw' || gameStatus === 'win') {
      await db.Games.update({
        status: 'completed'
      },
        {
          where: {
            gameId: gameId
          }
        })
      await redis.del(`game-round-${gameId}`)
      await redis.del(`${gameId}-move-by`)
    }


    res.status(200).send({
      message: 'Move Updated Successfully'
    })

  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: 'Unable To Update Game Move'
    })
  }


}

const leftGameController = async (req, res) => {
  const { gameId } = { ...req.body, ...req.user }

  try {
    let gameData = await redis.get(`game-round-${gameId}`)
    console.log('gameData --------------------------', gameData);

    if (!gameData) {
      res.status(200).send({
        message: 'Game Is Already Over'
      })
      return
    }
    await db.Games.update({
      status: 'completed'
    }, {
      where: {
        gameId
      }
    })
    await redis.del(`game-round-${gameId}`)
    await redis.del(`${gameId}-move-by`)

    emitSocketEvent(req, '/game-update', `game-${gameId}`, 'notification',
      {
        type: 'game-result',
        status: 'game-over',
        reason: `Game Is Over`
      }
    )


    res.status(200).send({
      message: 'Player Left Successfull'
    })

  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: 'Unable To Left Game'
    })
  }


}



export { userSignUpController, userLoginController, createGameController, getGameCodeController, joinGameController, startGameController, gameMoveController, leftGameController } 
