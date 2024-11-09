
export const validatePremiumUser = (req,res,next) => {
    if(!req.user.isPremium){
      res.status(401).send({message : "user does not have premium subscription to use the service"})
    }
    next()
  }
