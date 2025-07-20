import companyModel from "../models/company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import createToken from "../utils/generateToken.js";
import jobModel from "../models/job.js";
import JobApplicationModel from '../models/jobApplication.js'
import jobApplicationModel from "../models/jobApplication.js";
//register a new company
const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;
  if (!name || !email || !password || !imageFile) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    const isExists = await companyModel.findOne({email});

    if (isExists) {
      return res.json({
        success: false,
        message: "Company with email already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await companyModel.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      message: "Company details Uploaded to DB",
      company,
      token: createToken(company._id),
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

//company login
const loginCompany = async (req, res) => {

  try{
    const {email,password}=req.body
  const company= await companyModel.findOne({email})

  if(!company){
    return res.json({
      success:false,
      message:"Company with give mail does not exists"
    })
  }
  const comparePassword= await bcrypt.compare(password,company.password)
  if(comparePassword){
    return res.json({
      success:true,
      message:'Logged in successfully',
      company,
      token:createToken(company.id)

    })
  }else{
    return res.json({
      success:false,
      message:"Invalid Credentials"
    })
  }
  }catch(err){
     console.log(err.message)
     res.json({
      success:false,
      message:err.message
     })
  }
  
};

//get company data
const getCompanyData = async (req, res) => {
  
  try{
    const company=req.company
    res.json({
      success:true,
      company
    })
  }catch(err){
    res.json({
      success:false,
      message:err.message
     })
  }
};

//Post a new Job
const postJob = async (req, res) => {
   const {title,description,salary,category,location,level}=req.body

   const companyId = req.company
   
   try{
        const job=await jobModel.create({
    title,
    description,
    salary,
    category,
    location,
    date:Date.now(),
    companyId,
    level


   })
   return res.json({
    success:true,
    message:"Job Posted Successfully",
    job
   })
   }catch(err){
     
     res.json({
      success:false,
      message:err.message
     })
   }
   
};

//get company job applicants
const getCompanyJobApplicants = async (req, res) => {
  
  try{
    const companyId = req.company._id
   
    //find job Application for the user and populate related data
    const applications= await jobApplicationModel.find({companyId}).populate('userId','name image resume')
    .populate('jobId','title location category level salary')
    .exec()

    return res.json({
      success:true,
      applications
    })
  }catch(err){
     res.json({
      success:false,
      message:err.message
     })
  }
};

//Get company posted jobs
const getCompanyPostedJobs = async (req, res) => {
  try{
   const companyId=req.company._id
   const jobs= await jobModel.find({companyId})
   const jobsData= await Promise.all(jobs.map(async (job)=>{
      const applicants = await JobApplicationModel.find({jobId : job._id})
      return {
        ...job.toObject(),applicants:applicants.length
      }
   }))
   res.json({
    success:true,
    jobsData
   })
  }catch(err){
    res.json({
      success:false,
      message:err.message
     })
  }
};

//change application status
const changeJobApplicationStatus = async (req, res) => {
  try{
      const {id,status}=req.body
      const updatedData=await jobApplicationModel.findByIdAndUpdate(id,{status})
      res.json({
        succes:true,
        updatedData
      })
  }catch(err){
    res.json({
      success:false,
      message:err.message
     })
  }
};

//change job visibility
const changeJobVisibility = async (req, res) => {
  try{
    const {id} = req.body
    const companyId=req.company._id
    const job=await jobModel.findById(id)
    if(companyId.toString() === job.companyId.toString()){
      job.visible= ! job.visible
    }
    await job.save()

    res.json({
      success:true,
      message:"Visibility changed Successfully",
      job
    })
  }catch(err){
     res.json({
      success:false,
      message:err.message
     })
  }
};

export {
  registerCompany,
  loginCompany,
  getCompanyData,
  postJob,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  changeJobApplicationStatus,
  changeJobVisibility,
};
