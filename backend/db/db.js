import mongoose from "mongoose";

const conneected=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB);
        console.log("connected to mongoose")

    }
    catch(error){
        console.log(error)

    }
}

export default conneected