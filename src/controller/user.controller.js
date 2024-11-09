import { Op, where } from "sequelize"
import db from "../db/models"
import passport from "passport"
import {uploadFileInCloudinary} from '../utils/cloudinary.js'

const userSignUpController = async(req,res) => {
  const {fullName,userName,email,age,password} = req.body
  const myUser = await db.User.findOne({
    where : {
      [Op.or]:[{userName : userName,email: email}]
  }
  })
  if(myUser){
    res.status(400).send({
      message: 'user already exist with same username or email'
    })
  }
  const avatarFile =   req?.files?.avatar[0]?.path 
  const avatar = await uploadFileInCloudinary(avatarFile)
  console.log('my avatar',avatar);
  const newUser = await db.User.create({userName,email,fullName,avatar:avatar?.url,password})
  console.log(newUser);
  res.status(400).send({
    message: 'user created successfully'
  })}


const userLoginController = async(req,res,next) => {
  try{
    passport.authenticate('local',(err,details)=>{
      console.log(err);
      if(err){
        res.status(400).send({
          message: err
        })
      }
      console.log(details);
      if(details){
        res.status(200).send({
          message: 'User Logged in Successfully',
          user: {
            ...details.dataValues,
            token: details.token
          }
        })
      }
    })(req,res)
  }catch(err){
    console.log(err);
  }
    // res.send('hello')
  }

  const addUserPremium = async(req,res) => {
    const user = req.user
    console.log(user);
    await db.User.update(
      {isPremium: true},
      {
      where:{
        userId: user?.userId
      }
    }
    )
    res.status(200).send('user is now a premium user')
  }

export {userSignUpController,userLoginController,addUserPremium} 
