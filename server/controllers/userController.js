import jobModel from "../models/job.js";
import jobApplicationModel from "../models/jobApplication.js";
import UserModel from "../models/users.js";
import { v2 as cloudinary } from "cloudinary";

//Get user data
const getUserData = async (req, res) => {
  const {userId} =await req.auth();
  try {
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    res.json({
      success: true,
      message: "fetched Successfully",
      userData,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// Get apply for a job

const applyForJob = async (req, res) => {
  const { jobId } = req.body;
 
  try {
    const {userId} =await req.auth();
    const alreadyApplied = await jobApplicationModel.findOne({ jobId, userId });

    if (alreadyApplied) {
      return res.json({
        success: false,
        message: "Already Applied",
      });
    }
    const jobData = await jobModel.findById(jobId);
    if (!jobData) {
      return res.json({
        success: false,
        message: "Job is not available",
      });
    }
    const applyJob = await jobApplicationModel.create({
      userId,
      jobId,
      companyId: jobData.companyId,
      date: Date.now(),
    });

    res.json({
      success: true,
      message: "Job Applied Successfully",
      applyJob,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// Get user applied applications

const getUserJobApplications = async (req, res) => {
  try {
    const {userId} =await req.auth();
    const applications = await jobApplicationModel
      .find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();
    if (!applications) {
      return res.json({
        success: false,
        message: "No job application found",
      });
    }

    return res.json({
      success: true,
      applications,
    });
  }catch(err) {
    res.json({
      success: false,
      message: "something",
    });
  }
};

//update user resume

const updateUserResume = async (req, res) => {
  try {
    const {userId} =await req.auth();
    const resumeFile = req.file;

    const userData = await UserModel.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }
    await userData.save();
    return res.json({
      success: true,
      message: "Resume Updated",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export { getUserData, applyForJob, getUserJobApplications, updateUserResume };
