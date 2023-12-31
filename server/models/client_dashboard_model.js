const mongoose = require("mongoose");
const User = require("./register_model");

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
  contact: [
    {
      city: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
  ],
  clientid: {
    type: String,
    id: User._id,
  },
});

module.exports = mongoose.model("ClientData", clientSchema);
