const Channel = require("../models/Channel.js");
const ChannelController = {};

ChannelController.findAll = async (req, res) => {
  const result = await Channel.find();
  return { result };
};
module.exports = ChannelController;
