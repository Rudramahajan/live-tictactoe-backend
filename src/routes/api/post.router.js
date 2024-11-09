import { Router } from "express";
import { isUserAuthenticated } from "../../middlewares/user.midddleware";
import { upload } from "../../middlewares/multer.middleware";
import { addLikeController, addPostController, getPostController } from "../../controller/post.controller";

const postRouter = Router();

postRouter.route('/add-post').post(upload.fields([
  {
    name:'image',
    maxCount:1
  }
]),isUserAuthenticated,addPostController)

postRouter.route('/get-post').get(getPostController)

postRouter.route('/like').post(isUserAuthenticated,addLikeController)

export default postRouter