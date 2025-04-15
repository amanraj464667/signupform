import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const signup = async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        const user=await User.findOne({email});
        if(user)
        {
            return res.status(409).json({message:'User is already exist you can login',success:false});
        }
        const users = new User({name,email,password});
        users.password = await bcrypt.hash(password,10);
        await users.save();
        res.status(201).json({message:"Signup successful",success:true})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",success:false})
    }
}

export const login = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(403).json({message:'Auth failed Email or password is wrong',success:false});
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403).json({message:'Auth failed Email or password is wrong',success:false})
        }

        const jwtToken=jwt.sign({email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        res.status(200).json({message:"Login successful",success:true,jwtToken,email,name:user.name})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",success:false})
    }
}
