const jwt = require('jsonwebtoken');
require('dotenv').config();
const Authentication = (req, res, next) => {
    const {Event_name } = req.body;
    const token = req.headers?.authorization?.split(" ")[1];
    console.log(token)
    var decoded = jwt.verify(token, process.env.SECRET);
    const isAdmin = decoded.isAdmin;
    const isPartner = decoded.isPartner;
    console.log(isAdmin,isPartner)
    if (Event_name) {
        if (decoded && isPartner) {
            next();
        }
        else {
            res.send("Plese login again")
        }
    }
    else{
        if (decoded && isAdmin) {
            next();
        }
        else {
            res.send("Plese login again")
        }
    }

}
module.exports = {Authentication}