const express = require("express");
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { userdata } = require("../database.js")
const { jwt_secret } = require("../config.js")
const { userMiddleware } = require("../middleware.js")
const { therapistdata } = require("../database.js");
const { appointmentdata } = require("../database.js")
const router = express.Router();

router.use(express.json());


const userBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    contact: zod.number(),
    password: zod.string()
})

router.post("/signup", async function (req, res) {

    const { success } = userBody.safeParse(req.body);

    if (!success) {
        return res.json({
            msg: "wrong inputs"
        })
    }

    const existinguser = await userdata.findOne({
        username: req.body.username
    })

    if (existinguser) {
        return res.json({
            msg: "these user is already signup"
        })
    }

    const user = await userdata.create(req.body);

    const userid = user._id;

    const token = jwt.sign({ userid }, jwt_secret)

    res.json({
        token: token
    })
})

const signinbody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async function (req, res) {
    const { success } = signinbody.safeParse(req.body);
    if (!success) {
        return res.json({
            msg: "you entered wrong inputs"
        })
    }

    const existinguser = await userdata.findOne({
        username: req.body.username,
        password: req.body.password
    })



    try {
        if (existinguser) {
            const userid = existinguser._id;
            const token = jwt.sign({ userid }, jwt_secret);
            res.status(200).json({
                token: token
            })
        } else {
            res.json({
                msg: "user doesn't exists"
            })
        }

    } catch (error) {
        res.json({
            error
        })
    }
})


router.post("/appointment", userMiddleware, async function (req, res) {

    
    const therapist_id = req.body.therapistId;
    //console.log("get body data",therapist_id)
    const userid = req.userid;
   // console.log("tid",therapist_id)
   // console.log("uid",userid)
    const existing_appointment = await appointmentdata.findOne({
        therapist_id: therapist_id,
        customer_id: userid
    })
    console.log(existing_appointment)
    if (existing_appointment) {
        return res.json({
            msg: "appointment already done"
        })
    }

    const therapist=await therapistdata.findOne({
        _id:therapist_id
    })
    //console.log('ther',therapist)
    const customer=await userdata.findOne({
        _id:userid
    })
    console.log("cust",customer)
    await appointmentdata.create({
        therapist_id:therapist._id,
        therapist_name:therapist.name,
        therapist_contact:therapist.contact,
        customer_id:customer._id,
        customer_name:customer.firstname,
        customer_contact:customer.contact
    })

    res.json({
        msg:"appointment created"
    })
})

router.get("/appointments", userMiddleware,async function(req,res){
   
        const id=req.userid;
    console.log(id)
    const find=await appointmentdata.find({
        customer_id:id
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

module.exports = router;