const jwt = require('jsonwebtoken');
require('dotenv').config();
const Authentication = (req, res, next) => {
    const {Event_name } = req.body;
    const token = req.headers?.authorization?.split(" ")[1];
    var decoded = jwt.verify(token, process.env.SECRET);
    const isAdmin = decoded.isAdmin;
    const isPartner = decoded.isPartner;

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
            console.log(decoded,isAdmin)
            next();
        }
        else {
            res.send("Plese login again")
        }
    }

}
module.exports = {
    Authentication
}