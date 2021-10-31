const express = require("express");
const router = express.Router();

const channelController = require("../controllers/ChannelController.js");

//get method가 들어오면 channel data 목록을 return
router.get("/", async (req, res, next) => {
  const ret = await channelController.findAll();
  res.json(ret);
});

module.exports = router;
