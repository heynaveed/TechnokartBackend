const { Router } = require("express");
const { EventModel } = require("../Model/Event.models");

const PartnerEvent = Router();

PartnerEvent.post("/", async (req, res) => {
   const { Event_name, Country, State, City, Pincode } = req.body;
   const Data = new EventModel({
      Event_name: Event_name,
      Country: Country,
      State: State,
      City: City,
      Pincode: Pincode
   })
   console.log(Data);
   await Data.save();
   res.send("Event Added Success fully");
})

module.exports = { PartnerEvent };