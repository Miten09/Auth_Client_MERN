const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = mongoose.connect(process.env.DATABASE).then(() => {
  console.log("MongoDB connected Successfully");
});
