import express from "express";
import {
  registerCompany,
  loginCompany,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  changeJobApplicationStatus,
  changeJobVisibility,
  postJob
} from "../controllers/companyController.js";
import upload from "../config/multer.js";


const router = express.Router();

//register a company
router.post("/register",upload.single('image'), registerCompany);

//company login
router.post('/login',loginCompany)

//get Company data
router.get('/company',getCompanyData)

//post a job
router.post('/post-job',postJob)

//get applicants data of company
router.get('/applicants',getCompanyJobApplicants)

//get company job list
router.get('/list-jobs',getCompanyPostedJobs)

// change Applications
router.post('/change-status',changeJobApplicationStatus)

//change Application visibility
router.post('/change-visibility',changeJobVisibility)

export default router
