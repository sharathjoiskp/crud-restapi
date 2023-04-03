const asyncHandler = require("express-async-handler");

const Contact = require("../models/conatctModel");

const getContact = asyncHandler(async (req, res) => {
  
    const contact= await Contact.find();

    res.status(200).json(contact);
});


const createContact = asyncHandler(async (req, res) => {
    console.log("the request body is :", req.body);

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All field are mandatory  !");
    }
   
const contact =await Contact.create({
    name,
    email,
    phone,
});
    res.status(201).json(contact);
});

const getSingleContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
   
});

const updateContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateContact =await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {name:true}

    );
    res.status(200).json(updateContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.remove();
    res.status(200).json(contact);
});
module.exports = { getContact, createContact, getSingleContact, updateContact, deleteContact };