import { usermodel } from "../../model/user.model.js"

export const signup=async(req,res,next)=>{
    try {
        const {name,email,password,phone,age}=req.body
        const existuser=await usermodel.findOne({email})
        if(existuser){
            throw new Error("Email_exist")
        }
        const data=await usermodel.create({name,email,password,phone,age})
        res.status(200).json({message:"done signup",
            data
        })
    } catch (error) {
        res.status(400).json({message:"fail signup",
            error:error.message,
            stack:error.stack
        })
    }
}

export const signin=async(req,res,next)=>{
    try {
        const {email,password}=req.body
        const existuser=await usermodel.findOne({email,password})
     
        if(!existuser){
            throw new Error("Invalid email or password")
        }
        res.status(200).json({message:"User",
            data: existuser
        })
    } catch (error) {
        res.status(400).json({message:"fail to signin",
            error:error.message,
            stack:error.stack
        })
    }
}

export const update_user=async(req,res,next)=>{
    try {
        const{id}=req.params
        const{name,email,age}=req.body
    const userExist = await usermodel.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const data=await usermodel.findByIdAndUpdate(id,{name,email,age},{new:true}).select("-password")
       res.status(200).json({message:"User updated" ,
            data
        })

    } catch (error) {
          res.status(400).json({message:"fail to update",
            error:error.message,
            stack:error.stack
        })
    }
}

export const delete_user=async(req,res,next)=>{
    try {
        const {id}=req.params
        const data=await usermodel.findByIdAndDelete(id)
          res.status(200).json({message:"User delete",
            data
        })
    } catch (error) {
            res.status(400).json({message:"fail to delete",
            error:error.message,
            stack:error.stack
        })
    }
}

export const get_users=async(req,res,next)=>{
    try {
        const {id}=req.params
        const user=await usermodel.findById(id)
        if(!user){
            throw new Error("User_not_found")
        }
        res.status(200).json({message:"users",
            data:user
        })
    } catch (error) {
        res.status(400).json({message:"fail to get user",
            error:error.message,
            stack:error.stack
        })
    }
}