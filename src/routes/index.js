import { Router } from "express";
import userRouter from './api/user.router.js'

const router = Router()
router.use('/user',userRouter);


export default router;