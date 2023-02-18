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

//step 4 login

export const login = async ( req, res)=>{
    try{
        const {email , password} = req.body;
        const user = await User.findOne( { email : email});
        if(!user) return res.status(400).json({msg: "user does not exist"});

        const isMatch= await bcrytp.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg: "Invaild credentials."});
        const token = jwt.sign({id : user._id},process.env.JWT_SECRET);
        delete super.password;
        res.status(200).json({token,user});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};