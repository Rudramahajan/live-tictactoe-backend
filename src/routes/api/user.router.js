import { Router } from "express";
import { createGameController, userLoginController, userSignUpController,getGameCodeController, joinGameController,startGameController, gameMoveController,leftGameController} from '../../controller/user.controller.js'
import { upload } from "../../middlewares/multer.middleware.js";
import { isUserAuthenticated }from '../../middlewares/user.midddleware.js'
const router = Router()

router.route('/signup').post(userSignUpController)

router.route('/login').post(userLoginController)

router.route('/create-game').post(isUserAuthenticated,createGameController)
router.route('/get-game-details').get(isUserAuthenticated,getGameCodeController)

router.route('/join-game').post(isUserAuthenticated,joinGameController)

router.route('/start-game').post(isUserAuthenticated,startGameController)

router.route('/game-move').post(isUserAuthenticated,gameMoveController)

router.route('/left-game').post(leftGameController)



export default router