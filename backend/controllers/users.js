import user from "../models/userSchema.js";
import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"

const secret="1234tvbsd"
export const signin=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existEmail=await user.findOne({email});
        if(existEmail){
            return res.status(404).json({message:"already exist"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new user({name,email,password:hashedPassword});
        await newUser.save();
        return res.status(201).json({message:"Saved"});

    }

    catch(error){
        console.log(error)
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const existEmail=await user.findOne({email});
        if(!existEmail){
            return res.status(404).json({message:"invalid creadentials"});
        }
        const hashPassword=await bcrypt.compare(password,existEmail.password);
        if(!hashPassword){
            
            return res.status(404).json({message:"invalid creadentials"});
        }

        const token=jwt.sign({userId:existEmail.id},secret,{expiresIn:"12hr"});


        return res.status(201).json({token});
    }

    catch(error){
        console.log(error)
    }
}


export const getUserId=async(req,res)=>{
    try{
        const userid=req.user;
     
        return res.status(200).json({userid})

    }
    catch(error){
        console.log(error)
    }
}

export const getUserDetails=async(req,res)=>{
    try{
        const userid=req.user
        const userDetails=await user.findById(userid)
    
        return res.status(201).json({userDetails})

    }
    catch(error){
        console.log(error)
    }
}

