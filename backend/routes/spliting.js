const express=require("express");
const router=express.Router();
const user_root=require("./user.js")
const therapist_root=require("./therapist.js")
const appointment_root=require("./appointment.js")

router.use("/user",user_root)
router.use("/therapist",therapist_root)
router.use("/appointment",appointment_root);
module.exports = router