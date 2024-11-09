import jwt from 'jsonwebtoken'

export const createToken = (user) => {
  const token = jwt.sign({userId: user.userId},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRY_TIME})
  return token
}

export const verifyToken = (accessToken) => {
  try{
    const token = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
    return token
  }catch(err){
    
  }
}

