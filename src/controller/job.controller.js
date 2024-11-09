import db, {sequelize} from "../db/models"

const applyJob = async(req,res) => {
  const {jobId} = req.body
  const user = req.user
  const [apply,created] = await db.Apply.findOrCreate({
    where : {
      userId : user?.userId,
      jobId
    }
  })
  console.log(created);
  if(!created){
    res.status(400).send({message: 'already applied for job'})
  }
  res.status(200).send({message:'Job Applied Succesfully'})
}

const revokeApplyJob = async(req,res) => {
  const {jobId} = req.body
  const user = req.user
  const apply = await db.Apply.findOne({
    where : {
      userId : user?.userId,
      jobId
    }
  })
  if(!apply){
    res.status(400).send({message: 'user never applied for job'})
  }
  await db.Apply.destroy({
    where:{
      applyId: apply?.applyId
    }
  })
  res.status(200).send({message:'Job Apply revoked Succesfully'})
}

const getJobsListController = async(req,res) => {
  try{
    const jobs = await db.Job.findAndCountAll({
      attributes : {
        include : [
            [sequelize.literal(`(
              SELECT COUNT(*) from "Applies" where "Job".job_id = "Applies".job_id
          )`),
          'applyCount']
      ]
    }
    })
    res.status(200).send({message:"fetched successfully",jobs})
  }catch(err){
    console.log(err);
  }
}

export {applyJob,revokeApplyJob,getJobsListController}