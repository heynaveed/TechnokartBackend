const mongoose = require("mongoose");
const PartnerSchema = mongoose.Schema({
    Partner_name: { type: String, required: true },
    Partner_email: { type: String, required: true },
    login_link: { type: String, required: true }
})
const PartnerModel = mongoose.model("partner", PartnerSchema);

module.exports = { PartnerModel };