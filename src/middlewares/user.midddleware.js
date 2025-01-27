import passport from "passport";

export const isUserAuthenticated = (req,res,next) => {
  passport.authenticate('jwt',(err,details)=>{
    if(!details){
      res.status(401).send({message: 'User Unauthenticated'})
    }
    if(details === 'token expired'){
      res.status(401).send({message: 'token expired'})
    }
    if(details){
      req.user  = details.dataValues
      next()
    }
  })(req,res)
}