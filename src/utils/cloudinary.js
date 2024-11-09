import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadFileInCloudinary = async(file) => {
  try {
    if(!file)return
    const  res = await cloudinary.uploader.upload(file)
    console.log(res);
    return res
  }catch(err){
    fs.unlinkSync(file) 
  }
}