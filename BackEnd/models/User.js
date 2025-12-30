const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: "" // optional, can store profile image URL
  },
  boards: [
    {
      title: { type: String },
      date: { type: Date, default: Date.now },
      content: { type: String } // can store board JSON data
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
