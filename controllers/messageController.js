const express = require("express")
const router = express.Router()
const Message = require("../models/message.js")
const Photo = require("../models/photo.js")
const User = require("../models/user.js")
const bodyParser = require("body-parser")



// Post route to track new messages
router.post("/", async (req,res,next)=>{

	const createdMessage = new Message
	try{
    const userFound = await User.findById(req.session.userId)
    const photoFound = await Photo.findById(req.body.photoId)
    console.log(photoFound, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    createdMessage.photo = photoFound
		createdMessage.title = req.body.title
		createdMessage.content = req.body.content
		createdMessage.price = req.body.value
    createdMessage.username = userFound.username

		res.redirect(`/photos/photo/${photoFound._id}`)
	} catch(err){
		next(err)
	}
})
// Show route
// Edit page



module.exports = router
