//step 2 
import bcrytp from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
//step 3
//register

export const register = async(req,res)=>{
    try{
const{ 
    firstName,lastName,email,password,picturePath,friends,location,occupation
    }=req.body;//frount end to get
    const salt = await bcrytp.genSalt();//encrypt password
    const passwordHash = await bcrytp.hash(password,salt);

    const newUser = new User({
        firstName,lastName,email,password: passwordHash,picturePath,friends,location,occupation,viewProfile:math.floor(math.random()*10000),impressions:(math.random()*10000)
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);//fe to receive res
    }catch(err){
        res.status(500).json({ error: err.message});
    }
};