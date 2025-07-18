import {Webhook} from 'svix'
import UserModel from '../models/users.js'

//API controller function to manage clerk user with database

const clerkWebhooks = async (req,res)=>{
    try{
      // create svix instance with clerk webhook secret
      const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

      //Verifying Headers
      await whook.verify(JSON.stringify(req.body),{
        "svix-id":req.headers['svix-id'],
        'svix-timestamp':req.headers['svix-timestamp'],
        'svix-signature':req.headers['svix-signature']
      })
      // getting data from request body
      const {data,type} = req.body
      
      //swith case for different event
      switch (type){
        case 'user.created':{
            const userData={
                _id:data.id,
                email:data.email_addresses[0].email_address,
                name:data.first_name + " " + data.last_name,
                image:data.image_url,
                resume:''

            }

            await UserModel.create(userData)
            res.json({})
            break
        }
        case 'user.updated':{
             const userData={
               
                email:data.email_addresses[0].email_address,
                name:data.first_name + " " + data.last_name,
                image:data.image_url,
                

            }

            await UserModel.findByIdAndUpdate(data.id,userData)
            res.json({})
            break
        }

        case 'user.deleted':{
            await UserModel.findByIdAndDelete(data.id)
            res.json({})
            break
        }
        default:
            break


      }
    }catch(err){
      console.log(err.message)
      res.json({
        success:false,
        message:"Web Hook Error"
      })
    }
}

export default clerkWebhooks