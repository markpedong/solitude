const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ProductModel = require("./models/ProductModel");
//SOLIDITYDATABASE is the NAME OF THE DATABASE IN MONGODB COMPASS

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://solidity:F6NtSGnQTTrhtacl@solidity.mcmfi.mongodb.net/SOLIDITYDATABASE?retryWrites=true&w=majority"
);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/short-product", (req, res) => {
  ProductModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
