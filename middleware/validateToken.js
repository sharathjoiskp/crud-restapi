const asyncHandler=require("express-async-handler");
const req = require("express/lib/request");
const res = require("express/lib/response");
const jwt=require("jsonwebtoken");
const { Error } = require("mongoose");

const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,decode)=>{
  if (err) {
    res.status(401);
    throw new Error("User is not authoorized");
  }
  req.user=decode.user;
  next();
        });
        if (!token) {
            res.status(401);
            throw new Error("user not Authorized")
        }
    }        });
    


module.exports=validateToken;