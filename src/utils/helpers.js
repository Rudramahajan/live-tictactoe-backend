import jwt from 'jsonwebtoken'

export const createToken = (user) => {
  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY_TIME })
  return token
}

export const verifyToken = (accessToken) => {
  try {
    const token = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
    return token
  } catch (err) {

  }
}

export const checkGameResult = (gameArray) => {
  let x = 'X', y = 'O'
  for (let i = 0; i < gameArray.length; i++) {
    let countX = 0, countY = 0
    for (let j = 0; j < gameArray.length; j++) {
      countX = countX + (gameArray[i][j] === x ? 1 : 0)
      countY = countY + (gameArray[i][j] === y ? 1 : 0)
    }
    if (countX === 3 || countY === 3) {
      return {
        gameStatus: 'win'
      }
    }
  }
  for (let i = 0; i < gameArray.length; i++) {
    let countX = 0, countY = 0
    for (let j = 0; j < gameArray.length; j++) {
      countX = countX + (gameArray[j][i] === x ? 1 : 0)
      countY = countY + (gameArray[j][i] === y ? 1 : 0)
    }
    if (countX === 3 || countY === 3) {
      return {
        gameStatus: 'win'
      }
    }
  }
  let countX = 0, countY = 0
  for (let i = 0; i < 3; i++) {
    countX = countX + (gameArray[i][i] === x ? 1 : 0)
    countY = countY + (gameArray[i][i] === y ? 1 : 0)
  }
  if (countX === 3 || countY === 3) {
    return {
      gameStatus: 'win'
    }
  }
  countX = 0, countY = 0
  for (let i = 0; i < 3; i++) {
    countX = countX + (gameArray[i][2-i] === x ? 1 : 0)
    countY = countY + (gameArray[i][2-i] === y ? 1 : 0)
  }
  if (countX === 3 || countY === 3) {
    return {
      gameStatus: 'win'
    }
  }
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      if(gameArray[i][j] === null){
        return {
          gameStatus : 'pending'
        }
      }
    }
  }
  return {
    gameStatus : 'draw'
  }
}

