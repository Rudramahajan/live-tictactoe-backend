import { Router } from "express";
import userRouter from './api/user.router.js'
import postRouter from "./api/post.router.js";
import chatRouter from './api/chat.routes.js'
import jobRouter from "./api/job.routes.js";

const router = Router()
router.use('/user',userRouter);
router.use('/post',postRouter);
router.use('/chat',chatRouter)
router.use('/job',jobRouter)


export default router;