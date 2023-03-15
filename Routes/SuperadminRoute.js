const { Router } = require("express");
const { Authentication } = require("../Middleware/Authentication");
const { PartnerModel } = require("../Model/Partner_models");

const SuperAdmin = Router();

// ALL PARTNER GET REQUEST
SuperAdmin.get("/", async (req, res) => {
    const Data = await PartnerModel.find({});
    res.send(Data);
})

// POST REQUEST FOR NEW PARTNER
SuperAdmin.post("/",Authentication, async (req, res) => {
    const { Partner_name, Partner_email } = req.body;
    const Data = new PartnerModel({
        Partner_name: Partner_name,
        Partner_email: Partner_email,
        login_link: `localhost:3000/${Partner_name}/login`
    });
    await Data.save();
    res.send("Partner Added Successfully");
})

//PATCH REQUEST FOR EDIT PARTNERS
SuperAdmin.patch("/", async (req, res) => {
    const Payload = req.query.id;
    console.log(req.query.id)
    const { Partner_email, Partner_name } = req.body;
    console.log(Payload, Partner_email, Partner_name);
    if (Partner_email) {
        await PartnerModel.updateOne({ _id: Payload }, { $set: { Partner_email: Partner_email } });
    }
    else if (Partner_name) {
        await PartnerModel.updateOne({ _id: Payload }, { $set: { Partner_name: Partner_name, login_link: `localhost:3000/${Partner_name}/login` } });
    }
    res.send("Updated Successfull");
})

//DELETE REQUEST FOR PARTICULAR PARTNER
SuperAdmin.delete("/", async (req, res) => {
    const Payload = req.query.id;
    await PartnerModel.deleteMany({ _id: Payload });
    res.send("Deleted Successfully");
})

module.exports = { SuperAdmin };