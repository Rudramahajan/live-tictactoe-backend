import { Router } from "express";
import { isUserAuthenticated } from '../../middlewares/user.midddleware.js'
import { getConversationListController, getMessagesListController, sendMessageController } from "../../controller/chat.controller.js";


const router = Router()

router.route('/send-chat').post(isUserAuthenticated,sendMessageController)

router.route('/get-conversation').get(isUserAuthenticated,getConversationListController)

router.route('/get-chats').get(isUserAuthenticated,getMessagesListController)

export default router
