import jwt from 'jsonwebtoken'
import companyModel from '../models/company.js'
const authMiddleware= async (req,res,next)=>{

    try{
         const {token} = req.headers
    if(!token){
        return res.json({
        success:false,
        message:"Not authorized"
       }) 
    }
    const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.company = await companyModel.findById(decodeToken.id).select('-password')
    next()
    }catch(err){
       
       return res.json({
        success:false,
        message:err.message
       })
    }
   
}

export default authMiddleware