const express=require("express");
const router=express.Router();
const {userdata}=require("../database.js");
const {therapistdata}=require("../database.js")

router.use(express.json());

router.post("/user",async function(req,res){

})

module.exports=router;