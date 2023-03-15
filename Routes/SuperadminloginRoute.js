const jwt = require('jsonwebtoken');
const { Router } = require("express");

const SuperAdminLogin = Router();

//PREDEFINED EMAIL AND PASSWORD FOR SUPER ADMIN.
SuperAdminLogin.post("/", (req, res) => {
    const isemail = "superadmin@gmail.com";
    const ispassword = "superadmin@123";
    const { email, password } = req.body;
    if (isemail == email && ispassword == password) {
        const token = jwt.sign({ isAdmin: true, isPartner: false }, process.env.SECRET);
        res.send({ "msg": "login successfull", "token": token });
    }
    else {
        res.send("data didn't match")
    };
})
module.exports = { SuperAdminLogin };