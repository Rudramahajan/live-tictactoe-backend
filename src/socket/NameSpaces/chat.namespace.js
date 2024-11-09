import { Op } from "sequelize"
import { emitSocketEvent } from ".."
import db from "../../db/models"
import { verifyToken } from "../../utils/helpers"
import notificationNamespace from "./notification.namespace"

const chatNamespace = (socketServer) => {
  const chatNamespace = socketServer.of('/user-chat')
  chatNamespace.use(async (socket, next) => {
    const accessToken = socket.handshake.headers.auth
    const conversationId = socket.handshake.query.conversationId
    const token = verifyToken(accessToken)

    const user = await db.User.findOne({
      where: {
        userId: token?.userId
      }
    })
    const operator = {}
    operator['conversationId'] = conversationId
    operator['user'] = user
    socket.operator = operator
    next()

  })

  chatNamespace.on('connection', (socket) => {
    const { conversationId } = socket?.operator
    socket.join(`conversation-${conversationId}`)
    chatNamespace.to(`conversation-${conversationId}`).emit("chat", "hi");
    socket.on('sendChat', async (data) => {
      const {recieverId,message} = data
      const {user} = socket?.operator
      console.log(user?.userId,recieverId,message);
      const [conversation, created] = await db.Conversation.findOrCreate({
        where: {
          [Op.or]: [
            {
              participantOneId: user?.userId,
              participantTwoId: recieverId
            },
            {
              participantOneId: recieverId,
              participantTwoId: user?.userId
            }
          ]
        },
        defaults: {
          participantOneId: user?.userId,
          participantTwoId: recieverId
        }
      })
      const payload = {
        conversationId: conversation?.conversationId,
        message,
        receipentId: recieverId,
        senderId: user?.userId
      }
      await db.Message.create(payload)
      chatNamespace.to(`conversation-${conversationId}`).emit("chat", payload);
      socketServer.of('/user-notification').to(`user-${recieverId}`).emit("notification", payload);
      // console.log(data);
    });
    // console.log('conversation socket is connected', conversationId);
  })
}

export default chatNamespace