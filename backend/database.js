const mongoose=require("mongoose");



mongoose.connect("enter your mongodb url")

const userschema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    firstname:{
        type:String,
        trim:true,
        required:true
    },
    lastname:{
        type:String
    },
    contact:{
        type:Number,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
})



const therpistschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    specification:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    clinic_address:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    }
})
const therapistdata=mongoose.model("therapistdata",therpistschema)
const userdata=mongoose.model("userdata",userschema);

const appointmentschema=mongoose.Schema({
    therapist_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:therapistdata
    },
    therapist_name:{
        type:String,
        required:true
    },
    therapist_contact:{
        type:Number
    },
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userdata
    },
    customer_name:{
        type:String
    },
    customer_contact:{
        type:Number
    },
    appointment:{
        type:String,
        default:"pending..."
    }
})




const appointmentdata=mongoose.model("appointmentdata",appointmentschema)

module.exports={
    userdata,
    therapistdata,
    appointmentdata
}
