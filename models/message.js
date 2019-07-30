const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
	photo: [{
    type: mongoose.Schema.Types.ObjectId,  // ._id
    ref: 'Photo'
  }],
	date: Date,
	title: String,
	content: String,
  price: Number,
  userName: String
})

const Message = mongoose.model("Message",messageSchema)
module.exports = Message
