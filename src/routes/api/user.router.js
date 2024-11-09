import { Router } from "express";
import {addUserPremium, userLoginController, userSignUpController} from '../../controller/user.controller.js'
import passport from "passport";
import {isUserAuthenticated} from '../../middlewares/user.midddleware.js'
import { upload } from "../../middlewares/multer.middleware.js";
const router = Router()

router.route('/signup').post(upload.fields([
  {
    name: 'avatar',
    maxCount: 1
  }
]),userSignUpController)

router.route('/login').post(userLoginController)

router.route('/add-premium').put(isUserAuthenticated,addUserPremium)


export default router