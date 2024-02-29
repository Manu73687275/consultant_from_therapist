const express=require("express");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const {jwt_secret}=require("../config.js")
const {therapistdata}=require("../database.js")
const {appointmentdata}=require("../database.js")
const router=express.Router();
router.use(express.json())

const therapistbody=zod.object({
    name:zod.string(),
    specification:zod.string(),
    gender:zod.string(),
    clinic_address:zod.string(),
    contact:zod.number()
})
router.post("/add_therapist",async function(req,res){
    
    const {success}=therapistbody.safeParse(req.body);
    if(!success)
    {
        return res.json({
            msg:"wrong inputs"
        })
    }
    const existingtherapist=await therapistdata.findOne({
        name:req.body.name,
        specification:req.body.specification,
        clinic_address:req.body.clinic_address
    });

    try {
        if(!existingtherapist)
        {
            const therapist=await therapistdata.create(req.body);

            const therapistId=therapist._id;

            const token=jwt.sign({therapistId},jwt_secret);

            res.json({
                msg:"therapist created successfully",
                token:token
            })
        }else{
            res.json({
                msg:"these therapist already exits"
            })
        }
    } catch (error) {
        res.json({
            error
        })
    }
})

router.get("/appointments", async function(req,res){
    const id = req.headers.therapistid;
    //console.log("Therapist ID:", id);

    
    const find=await appointmentdata.find({
        therapist_id:id
    })

    if(find)
    {
       res.json({
        appointments:find
    })
    }else{
        res.json({
            msg:"there is no appointments"
        })
    }
})

router.put("/approval",async function(req,res){
    const therapistid=req.body.therapistId;
    const userid=req.body.userid

    const existingdata=await appointmentdata.findOne({
        therapist_id:therapistid,
        customer_id:userid
    })

    if(existingdata.appointment=="accepted")
    {
        return res.json({
            msg:"update already done"
        })
    }

    if(existingdata)
    {
        await appointmentdata.updateOne({therapist_id:therapistid,customer_id:userid},{appointment:"accepted"})
        res.json({
            msg:"updated successfully"
        })
    }else{
        res.json({
            msg:"appointment doesn't exits"
        })
    }
})

module.exports=router;