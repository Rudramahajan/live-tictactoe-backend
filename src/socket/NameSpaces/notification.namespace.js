import db from "../../db/models"
import { verifyToken } from "../../utils/helpers"

const gameNotificationNamespace = (socketServer) => {
  const notificationNamespace = socketServer.of('/game-update')
  notificationNamespace.use(async(socket,next)=> {
    const gameId = socket.handshake.query.gameId
    const accessToken = socket.handshake.headers.auth
    console.log('accessToken -------------------------',accessToken);
    
    const token = verifyToken(accessToken)

    const user = await db.User.findOne({where:{
      userId: token?.userId
    }})

    const operator = {}
    operator['gameId'] = gameId
    operator['user'] = user
    socket.operator = operator
    next()

  })
  
  notificationNamespace.on('connection',(socket)=>{
    try{
      const {gameId, user} = socket?.operator
      console.log('gameId---------------',gameId);
      
      socket.join(`game-${gameId}`)
      console.log('joined ---------------');
      
      notificationNamespace.to(`game-${gameId}`).emit("notification", {
        type: 'joined',
        gameId: gameId,
        userDetails:{
          userId: user?.userId,
          userName: user?.userName  
        },
        message: `Player ${user?.userName} Joined The Game`
      });
    }catch(err){
      console.log(err);
      
    }
  })
}

export default gameNotificationNamespace