import db from "../../db/models"
import { verifyToken } from "../../utils/helpers"

const notificationNamespace = (socketServer) => {
  const notificationNamespace = socketServer.of('/user-notification')
  notificationNamespace.use(async(socket,next)=> {
    const accessToken = socket.handshake.headers.auth
    const token = verifyToken(accessToken)

    const user = await db.User.findOne({where:{
      userId: token?.userId
    }})

    const operator = {}
    operator['user'] = user
    socket.operator = operator
    next()

  })
  
  notificationNamespace.on('connection',(socket)=>{
    const user = socket?.operator?.user
    if(user){
      console.log(user?.userId);
    }
    socket.join(`user-${user?.userId}`)
    socket.in(`user-${user?.userId}`).emit("notification","hi");
    console.log('socket is connected',user?.userId.toString());
  })
}

export default notificationNamespace