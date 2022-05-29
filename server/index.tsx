import express from "express";
const app = express();
import mongoose from "mongoose";
const ProductModel = require("./models/Product");

//SOLIDITYDATABASE is the NAME OF THE DATABASE IN MONGODB COMPASS

mongoose.connect(
  "mongodb+srv://solidity:F6NtSGnQTTrhtacl@solidity.mcmfi.mongodb.net/SOLIDITYDATABASE?retryWrites=true&w=majority"
);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
