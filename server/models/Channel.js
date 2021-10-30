const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  _id: "string",
  name: "string",
});

module.exports = mongoose.model("Channel", ChannelSchema, "Channel");
