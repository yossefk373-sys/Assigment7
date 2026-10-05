import mongoose from "mongoose";

const  noteschema=new mongoose.Schema({
    title:{type:String,
        required:true,
        uppercase: false
    },
    content:{type:String,
        required:true
    },
    userId:{type: mongoose.Types.ObjectId,
        ref:"user",
        required:true

    }
},{
    timestamps:true,
    strict:false,
    optimisticConcurrency:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
export const notemodel=mongoose.model.note || mongoose.model("note",noteschema)