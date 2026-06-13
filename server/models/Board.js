const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema({
  username: String,
  roomId: String,
  dataURL: String, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Board", boardSchema);
 