import { notemodel } from "../../model/note.model.js"

export const create_note=async(req,res,next)=>{
    try {
        const {userId}=req.query
        const {title,content}=req.body
        const data=await notemodel.create({title,content,userId})
        res.status(200).json({message:"create note",
            data
        })
    } catch (error) {
        res.status(400).json({message:"fail to create note",
            error:error.message,
            stack:error.stack
        })
    }
}

export const update_note=async(req,res,next)=>{
    try {
        const {userId}=req.query
        const {id}=req.params
        const {title,content}=req.body
        const data=await notemodel.findById(id)
        if(!data){
           return res.status(404).json("note not found")
        }
        const user=await notemodel.findOneAndUpdate({_id:id,userId},{title,content},{new:true})
        if(!user){
        return  res.status(404).json("you are not the owner")
        }
        return  res.status(200).json({message:"update note",
            data:user
        })


    } catch (error) {
         res.status(500).json({message:"fail to update note ",
           error:error.message,
           stack:error.stack
        })
    }
}

export const replace_note=async(req,res,next)=>{
    try {
        const {userId}=req.query
        const {id}=req.params
        const {title,content}=req.body
        const data=await notemodel.findById(id)
        if(!data){
            return res.status(404).json("note not found")
        }
        const user =await notemodel.findOneAndReplace({_id:id,userId},{title,content},{new:true})
        if(!user){
            return res.status(404).json("you are not the owner")
        }
        return res.status(200).json({message:"replace note",
            data:user
        })

    } catch (error) {
        res.status(500).json({message:"fail to replace note ",
            error:error.message,
            stack:error.stack
        })
    }
}

export const update_All=async(req,res,next)=>{
    try {
        const {userId}=req.query
        const {title}=req.body
        const data=await notemodel.updateMany({userId},{title},{new:true})
        if(!data){
            return res.status(404).json("note not found")
        }
        res.status(200).json({message:"update all note",
            data
        })
    } catch (error) {
             res.status(500).json({message:"fail to replace note ",
            error:error.message,
            stack:error.stack
        })
    }
}

export const delete_note=async(req,res,next)=>{
    try {
        const {userId}=req.query
        const {id}=req.params
   const data=await notemodel.findById(id)
   if(!data){
    return res.status(404).json("note not found")
   }
   const user=await notemodel.findOneAndDelete({_id:id,userId})
   if(!user){
    return res.status(404).json("you are not the owner")
   }
      
    res.status(200).json({message:"delete note",
        data
    })
    } catch (error) {
        res.status(500).json({message:"fail to delete note ",
            error:error.message,
            stack:error.stack
        })
    }
}

export const get_note=async(req,res,next)=>{
    try {
        const {id}=req.params
        const {userId}=req.query
        const user=await notemodel.findOne({_id:id,userId})
        if(!user){
            return res.status(404).json("you are not the owner")
        }
        const data=await notemodel.findById(id)
        if(!data){
            return res.status(404).json("note not found")
        }
        res.status(200).json({message:"get note",
            data
        })
    } catch (error) {
        res.status(500).json({message:"fail to get note ",
            error:error.message,
            stack:error.stack
        })
    }
}

export const get_noteby_content=async(req,res,next)=>{
    try {
        const {content}=req.query
        const data=await notemodel.find({content})
        if(data.length===0){
            return res.status(404).json("note not found")
        }
        res.status(200).json({message:"get note by content",
            data
        })
    } catch (error) {
        res.status(500).json({message:"fail to get note by content ",
            error:error.message,
            stack:error.stack
        })
    }
}
export const get_notebyuser=async(req,res,next)=>{
    try {
        const {userId}=req.query
        const data=await notemodel.find({userId}).select("title userId createdAt").populate({path:"userId",select:"email"})
        res.status(200).json({message:"DONE",
            data
        })
    } catch (error) {
        res.status(500).json({message:"fail to get note by user ",
            error:error.message,
            stack:error.stack
        })
    }
}
export const Get_noteby_tittle=async(req,res,next)=>{
    try {
        const {title}=req.query
        const data=await notemodel.find({title}).populate({path:"userId",select:"name email"})
        res.status(200).json({message:"DONE",
            data
        })
    } catch (error) {
        res.status(500).json({message:"fail to get note by title ",
            error:error.message,
            stack:error.stack
        })
    }
}