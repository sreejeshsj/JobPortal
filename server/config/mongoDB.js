import mongoose from 'mongoose'

const connectDb =async ()=>{
    try{
        const uri=process.env.MONGO_URI
        await mongoose.connect(uri)
        
        console.log("Database Connected Successfully")
    }catch(err){
        console.log("Database is not connected ",err)
    }
}

export default connectDb