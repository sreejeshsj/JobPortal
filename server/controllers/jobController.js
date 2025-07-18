
import jobModel from "../models/job.js"



// Get all jobs
const getJobs = async (req,res)=>{
    try{
        const jobs= await jobModel.find({visible:true}).populate({path:'companyId',select:'-password'})
        res.json({
            success:true,
            message:"Jobs fetched Successfully",
            jobs
        })
    }catch(err){

        console.log(err.message)
        res.json({
            success:false,
            message:err.message
        })
    }
}

// Get Single job by id

const getJobById = async (req,res)=>{
        const {id}=req.params
        try{
         const jobDetails = await jobModel.findById(id).populate({path:'companyId',select:'-password'})

         if(!jobDetails){
            return  res.json({
            success:true,
            message:"Job not found"
         })
         }
         res.json({
            success:true,
            jobDetails
         })
        }catch(err){
             console.log(err.message)
        res.json({
            success:false,
            message:err.message
        })
        }
}

export {
    getJobs,
    getJobById
}