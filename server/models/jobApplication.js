import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    userId:{type:String,ref:'Users',required:true},
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:'Company',required:true},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:'Job',required:true},
    status:{type:String,default:'Pending'},
    date:{type:Number,required:true},
})

const jobApplicationModel=mongoose.models.Application || mongoose.model('Application',jobApplicationSchema)

export default jobApplicationModel