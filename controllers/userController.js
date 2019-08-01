const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const Photo = require("../models/photo.js")
router.get('/:id/edit', (req, res, next) => {
  res.send("hitting the edit route")
})


router.delete("/:id", async (req,res,next)=>{
	try{
		const foundUser = await User.findByIdAndRemove(req.params.id)
		// console.log(foundUser,"<-----found user in the delete route");
		const foundPhotos = await Photo.deleteMany({user:req.params.id})
		// console.log(foundPhotos,"<----found photo in the delete route");
		// need to find all the messages attached to the user too
		const foundMessages = await Message.deleteMany({"photo": "foundPhotos._id"})
		// console.log(res);
		res.redirect("/")
	}catch(err){
		next(err)
	}
})


module.exports = router
