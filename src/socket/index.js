import {Server} from 'socket.io'
import initializeNamespace from './NameSpaces/index.js'

const initializeSocket = (httpServer) => {
  
  const socketServer = new Server(httpServer,{
    cors: { origin: { origin: '*' } }
  })

  initializeNamespace(socketServer)
  return socketServer
}


const emitSocketEvent = (req,namespace,roomId, event, payload) => {
  console.log(roomId,event,req.app.get("io").to(roomId));
  req.app.get("io").of(namespace).to(roomId).emit(event, payload);
};

export { initializeSocket, emitSocketEvent }