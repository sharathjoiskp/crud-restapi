const mongoose =require("mongoose");

const connectSchema= mongoose.Schema({
 name:{
    type: String,
    required:[true,"Plase add the connect name"],
 },
 email:{
    type: String,
    required:[true,"Plase add the connect email"],
 },
 phone:{
    type: String,
    required:[true,"Plase add the connect phone"],
 },
 
},{
    timestamps:true,
});

module.exports=mongoose.model("Contact",connectSchema);