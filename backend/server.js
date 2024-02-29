
const express = require('express');
const cors=require("cors")
const app=express();
const mongoose=require("mongoose")
const rootrouter=require("./routes/spliting.js")
app.use(cors());
app.use(express.json());

app.use("/api/web",rootrouter)

mongoose.connect("mongodb+srv://Manu:Manu%40123@atlascluster.s7pr6p9.mongodb.net/consultant_from_therapist")
  .then(() => {
    console.log("mongodb is connected");
    app.listen(3000,()=>{
        console.log("server is on")
    })
})