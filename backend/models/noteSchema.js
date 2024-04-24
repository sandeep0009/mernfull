import mongoose from "mongoose";


const noteSchema=mongoose.Schema({
   
    subject:String,
    chapter:String,
    description:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});

const note=mongoose.model("note",noteSchema);
export default note;
