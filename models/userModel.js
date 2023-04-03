const mongoose =require("mongoose");



const userSchema= mongoose.Schema({
 username:{
    type: String,
    required:[true,"Plase add the User name"],
 },
 email:{
    type: String,
    required:[true,"Plase add the user email"],
    unique:[true,"Email adress already there"]
 },
 password:{
    type: String,
    required:[true,"Plase add the user password"],
 },
 
},{
    timestamps:true,
});

module.exports=mongoose.model("User", userSchema);