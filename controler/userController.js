const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

const registerUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
if (!username||!email||!password) {
    res.status(400);
    throw new Error("Fill up all fields ");
}
const userAvailbleorNot=await User.findOne({email});
if (userAvailbleorNot) {
    res.status(400);
    throw new Error("Allready registered");
}
const hashedPwd=await bcrypt.hash(password,1);
console.log("Hassd Pwd :",hashedPwd);
const user=await User.create({
    username,
    email,
    password:hashedPwd,
});
console.log("User created successfully:"+user);
if (user) {
    res.status(201).json({_id:user.id,email:user.email});
    
} else {
    res.status(400);
    throw new Error("User data not valid");
}

    res.json({message:"Register the User"});
});

const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if (!email||!password) {
        res.status(400);
    
        throw new Error("Fill up all fields ");
    }
    const user=await User.findOne({email});
    if (user && (await bcrypt.compare(password,user.password))) {
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECERT,{
            expiresIn:"1m"
        });
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or Pwd Wrong");
    }
   
});

const currentUser=asyncHandler(async(req,res)=>{
    res.json({message:"Current User Info"});
});

module.exports={registerUser,loginUser,currentUser};