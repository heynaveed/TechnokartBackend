const { Router } = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")

const PartnerLogin = Router();

//END POINT WHICH GENERATES OTP AND SEND IT TO THE RESPECTIVE MAIL.
PartnerLogin.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    let OTP = "";
    OTP = OTP + Math.floor((Math.random() * 999) + 1000);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'naveedpasha0058@gmail.com',
            pass: 'dmuaeikilyfecwgs'
        }
    });

    var mailOptions = {
        from: 'naveedpasha0058@gmail.com',
        to: email,
        subject: 'One Time Password',
        text: `Name:${name} OTP : ${OTP}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("error", error);
            res.send("Invalid Email Address")
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ "Msg": "OTP Sent Successfully", "OTP": OTP, "Partner": name });
        }
    });
})

//SENDING TOKEN ONCE OTP MATCHED.
PartnerLogin.post("/otp", (req, res) => {
    const { auth } = req.body;
    if (auth) {
        const token = jwt.sign({ isAdmin: false, isPartner: true }, process.env.SECRET);
        res.send({ "msg": "login successfull", "token": token });
    }
})

module.exports = PartnerLogin;