import db, { sequelize } from "../db/models";
import { uploadFileInCloudinary } from "../utils/cloudinary";

export const addPostController = async(req,res) => {
  const {description,type,company} = req.body
  const user = req.user
  console.log(description,user);
  const image = req?.files?.image[0]?.path
  const imageUrl = await uploadFileInCloudinary(image)
  let job = null
  const post = await db.Post.create({description,image:imageUrl?.url,userId:user?.userId})
  if(type === 'job'){
    job = await db.Job.create({description,company,postId:post?.postId})
  }
  if(post){
    res.status(200).send({
      message: 'post created successfully',
      post
    })
  }
}

export const getPostController = async(req,res) => {
  const {offset,limit} = req.query
  console.log(offset,limit);
  const post = await db.Post.findAndCountAll({
    offset,limit,
    attributes : {
      include : [
          [sequelize.literal(`(
            SELECT COUNT(*) from "Likes" where "Post".post_id = "Likes".post_id
        )`),
        'likesCount']
    ]
  },
  include:[
    {
      model: db.Job
    }
  ]
  })
  if(post){
    res.status(200).send({
      message: 'post fetched successfully',
      post
    })
  }
}

export const addLikeController = async(req,res) => {
  const {postId} = req.body
  const user = req.user
  console.log(req.query);
  const like = await db.Like.findOne({
    where: {
      userId: user.userId,
      postId: postId
    }
  })
  console.log(like,postId,user?.userId);
  if(like!==null){
    await db.Like.destroy({
      where: {
        userId: user.userId,
        postId: postId
      }
    })
    res.status(200).send({
      message: 'Like Removed'
    })
  }else{
    await db.Like.create({
      userId: user.userId,
      postId: postId
    })
    res.status(200).send({
      message: 'Like Added',
    })

  }
}