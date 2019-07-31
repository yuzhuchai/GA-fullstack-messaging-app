const express = require("express")
const router = express.Router()
const Message = require("../models/message.js")
const Photo = require("../models/photo.js")
const User = require("../models/user.js")
const bodyParser = require("body-parser")
const requireLogIn = require("../lib/requireAuth.js")

router.get("/:photoId/new", async(req, res, next) => {
	try {
		const foundPhoto = await Photo.findById(req.params.photoId)
		res.render("message/create.ejs", {
			photo: foundPhoto
		})
	} catch (err) {
		next(err)
	}
})

// Post route to track new messages
router.post("/", async (req,res,next)=>{
	try{
		const createdMessage = new Message
    const userFound = await User.findById(req.session.userId)
    const photoFound = await Photo.findById(req.body.photoId)

    createdMessage.photo = photoFound
		createdMessage.title = req.body.title
		createdMessage.content = req.body.content
		createdMessage.price = req.body.price
    createdMessage.username = userFound.username
    createdMessage.save()

		res.redirect(`/photos/photo/${photoFound.id}`)
	} catch(err){
		next(err)
	}
})
// Show route
// Edit page
router.get("/:messageId", requireLogIn, async (req,res,next)=>{
	try{
		const foundMessage = await Message.findById(req.params.messageId)
		const foundPhoto = await Photo.findById(foundMessage.photo)
		res.render("message/show.ejs",{
			critique: foundMessage,
			photo: foundPhoto
		})
	}catch(err){
		next(err)
	}
})

// Delete route
router.delete("/:messageId", requireLogIn, async (req, res, next) => {
	try {
		const foundMessage = await Message.findById(req.params.messageId)
		const photoId = await foundMessage.photo

		await Message.findByIdAndRemove(req.params.messageId)
		res.redirect(`/photos/photo/${photoId}`)

	} catch (err) {
		next(err)
	}
})


router.put("/:messageId", requireLogIn, async (req,res,next)=>{
	try{
		const editMessage = await Message.findByIdAndUpdate(req.params.messageId, req.body,{new:true})

		res.redirect(`/photos/photo/${editMessage.photo}`)
	}catch(err){
		next(err)
	}
})



module.exports = router
