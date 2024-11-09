import { Op } from "sequelize"
import db from '../db/models'
import { emitSocketEvent } from "../socket"

const sendMessageController = async(req,res) => {
  try {
    const {recieverId,message} = req?.body
    const user = req.user
    const [conversation,created] = await db.Conversation.findOrCreate({
      where : {
        [Op.or] : [
          {
          participantOneId : user?.userId,
          participantTwoId : recieverId
        },
        {
          participantOneId : recieverId,
          participantTwoId : user?.userId
        }
      ]
      },
      defaults : {
        participantOneId : user?.userId,
        participantTwoId : recieverId
      }
    })
    const payload = {
      conversationId:conversation?.conversationId,
      message,
      receipentId:recieverId,
      senderId: user?.userId
    }
    console.log(conversation,created);
    await db.Message.create(payload)
    emitSocketEvent(res,'/user-notification',`user-${recieverId}`,'notification',payload)
    emitSocketEvent(res,'/user-chat',`conversation-${conversation?.conversationId}`,'chat',payload)
    res.status(200).send('message send succesfully')

  }catch (err) {
    console.log(err);
  }
}

const getConversationListController = async(req,res) => {
  const userId = req?.user?.userId
  const conversation = await db.Conversation.findAll({
    where : {
      [Op.or] : [
        {participantOneId: userId},
        {participantTwoId:userId}
      ]
    },
    include : [
      {
      model: db.Message,
      limit:1,
      order:[['createdAt','DESC']]
     }
  ]
  })
  console.log(conversation);
  res.status(200).send(conversation)
}

const getMessagesListController = async(req,res) => {
  const {conversationId} = req.body
  const messages = await db.Message.findAll({
    where : {
      conversationId:conversationId,
    },
    order:[['createdAt','DESC']]
  })
  res.status(200).send(messages)
}

export {sendMessageController,getConversationListController,getMessagesListController}

