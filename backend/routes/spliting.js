const express=require("express");
const router=express.Router();
const user_root=require("./user.js")
const therapist_root=require("./therapist.js")


router.use("/user",user_root)
router.use("/therapist",therapist_root);

module.exports = router