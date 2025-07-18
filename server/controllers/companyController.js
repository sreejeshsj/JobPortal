import companyModel from "../models/company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import createToken from "../utils/generateToken.js";

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
const loginCompany = (req, res) => {};

//get company data
const getCompanyData = async (req, res) => {};

//Post a new Job
const postJob = async (req, res) => {};

//get company job applicants
const getCompanyJobApplicants = async (req, res) => {};

//Get company posted jobs
const getCompanyPostedJobs = async (req, res) => {};

//change application status
const changeJobApplicationStatus = async (req, res) => {};

//change job visibility
const changeJobVisibility = async (req, res) => {};

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
