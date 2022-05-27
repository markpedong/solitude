const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ProductModel = require("./models/Product");

//SOLIDITYDATABASE is the NAME OF THE DATABASE IN MONGODB COMPASS

mongoose.connect(
  "mongodb+srv://solidity:F6NtSGnQTTrhtacl@solidity.mcmfi.mongodb.net/SOLIDITYDATABASE?retryWrites=true&w=majority"
);
