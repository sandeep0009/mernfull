import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    upgradeId: { type: String, default: null },
    avatar:{
        type:String,
      
    }
},{timestamp:true})

const user=mongoose.model('user',userSchema)

export default user;