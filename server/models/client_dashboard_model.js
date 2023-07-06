const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: [
    {
      type: String,
      required: true,
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: [
    {
      type: Number,
      required: true,
    },
  ],
  city: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("ClientData", clientSchema);
