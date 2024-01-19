const mongoose = require("mongoose");

const messagesCollection = "messages";

const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const Messages = mongoose.model(messagesCollection, messageSchema);

module.exports = { Messages };
