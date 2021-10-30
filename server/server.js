const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const corsOptions = { origin: "http://localhost:8081" };
const PORT = process.env.PORT || 8080;
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Route 설정
app.use("/channel", require("./routes/channelRoute.js"));

const d = mongoose
  .connect("mongodb+srv://cluster0.da5up.mongodb.net/shopping", {
    user: "admin",
    pass: "naver123",
    authSource: "admin",
    replicaSet: "atlas-a3gk91-shard-0",
    readPreference: "primary",
  })
  .then(() => {
    console.log("MongoDB conncected");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
