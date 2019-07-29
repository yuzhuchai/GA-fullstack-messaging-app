const mongoose = require("mongoose")

const photoSchema = new mongoose.Schema({
	user: {
    type: mongoose.Schema.Types.ObjectId,  // ._id
    ref: 'User'
  },
	date: {
    type: Date,
    default: Date.now
  },
	title: String,
	photo: {
      data: Buffer,
      contentType: String
  },
})

const Photo = mongoose.model("Photo",photoSchema)
module.exports = Photo
