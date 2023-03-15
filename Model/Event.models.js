const mongoose = require("mongoose");
const EventSchema = mongoose.Schema({
    Event_name: { type: String, required: true },
    Country: { type: String, required: true },
    State: { type: String, required: true },
    City: { type: String, required: true },
    Pincode: { type: String, required: true }
})
const EventModel = mongoose.model("event", EventSchema);

module.exports = { EventModel };