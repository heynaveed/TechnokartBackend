const express = require("express");
const cors=require("cors");
const { Connection } = require("./Config/db");
const { Authentication } = require("./Middleware/Authentication");
const { SuperAdminLogin } = require("./Routes/SuperadminloginRoute");
const { SuperAdmin } = require("./Routes/SuperadminRoute");
const PartnerLogin = require("./Routes/PartnerLoginRoute");
const { PartnerEvent } = require("./Routes/PartnerEventRoute");

const app =express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const PORT=process.env.PORT || 8500;

app.use("/superadminlogin",SuperAdminLogin); //SUPERADMIN LOGIN END POINT.

app.use("/partnerlogin",PartnerLogin); //PARTNER LOGIN END POINT WITH OTP VERIFICATION.

app.use("/superadmin",SuperAdmin); //SUPERADMIN CRUD OPERATION ON PARTNERS.

app.use("/addevent",Authentication,PartnerEvent); //PARTNER POSTING EVENTS END POINT.

app.listen(PORT,async()=>{
    try{
     await Connection
     console.log("Connection to DB successfull");
    }
    catch(err){
     console.log("error in connecting in db");
     console.log(err)
    }
     console.log(`Listening to Port ${PORT}`)
 })