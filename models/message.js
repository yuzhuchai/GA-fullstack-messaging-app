const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
	photo: {
    type: mongoose.Schema.Types.ObjectId,  // ._id
    ref: 'Photo'
  },
	date: {type: Date, default: Date.now},
	title: String,
	content: String,
  price: Number,
  username: String
})

const Message = mongoose.model("Message",messageSchema)
module.exports = Message
