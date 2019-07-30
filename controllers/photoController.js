const express = require("express")
const router = express.Router()
const Photo = require("../models/photo.js")
const User = require("../models/user.js")
const multer = require("multer")
const fs = require("fs")

const upload = multer({dest: "uploads"})

//photo new route
router.get("/new", (req,res,next)=>{
	try {
		res.render("photo/create.ejs")
	} catch (e) {
		next(e)
	}
})



//photo post route
//!!!!!!!!!!!!!!attention!!!!!!!!!!!!
//need to add the user info to the created photos.
router.post("/", upload.single('photo'), async (req,res,next)=>{
	// res.send(req.file)
	//creates a file inside the uplaods folder.
	const filePath = req.file.path
	// console.log(req.body);
	const createdPhoto = new Photo
	try{

		createdPhoto.title = req.body.title
		// if(req.body.date) createdPhoto.date = req.body.date
		createdPhoto.photo.data = fs.readFileSync(filePath)
		createdPhoto.photo.contentType = req.file.mimetype

		const userFound = await User.findById(req.session.userId)
		console.log('USER FOUND BOI -----------------------------------------------', userFound);
		userFound.allPhotoIds.unshift(createdPhoto._id)
		createdPhoto.user=userFound
		await createdPhoto.save()
		console.log(createdPhoto, "<-------this is uploaded photo")
		res.redirect(`/photos/photo/${createdPhoto.id}`)
///now need to delete the file inside the upload folder.
		fs.unlinkSync(filePath)
	} catch(err){
		next(err)
	}
})


//need a route to serve the images.
router.get("/serve/:id", async (req,res,next)=>{
	try{
		const servePhoto = await Photo.findById(req.params.id)
		res.set("contentType", servePhoto.photo.contentType)
		res.send(servePhoto.photo.data)
	}catch(err){
		next(err)
	}
})

// SHOW ROUTE
router.get("/photo/:id", async (req,res,next)=>{
	try{
		const foundPhoto = await Photo.findById(req.params.id).populate("user")
		res.render("photo/show.ejs",{
			photo: foundPhoto
		})
	}catch(err){
		next(err)
	}
})

// Show newest Photo route
// GET /:userId/newest

// router.get("/:userId/newest", (req, res, next) => {
// 	try {
//
// 	} catch (err) {
//
// 	}
// })


//photo index route,
router.get("/:userId", async (req,res,next)=>{
	console.log('Hitting photo index route <<<<<<<<<<<<<<<<<--------------------------------');
	try{
		const foundPhotos = await Photo.find({"user": req.params.userId}).populate("user").sort({"date": -1})
		const foundUsers = await User.find({})
		res.render("photo/index.ejs",{
			photos: foundPhotos,
			users: foundUsers
		})
	}catch(err){
		next(err)
	}
})

router.get('/', (req, res) => {
	console.log(req.query);
	res.redirect(`/photos/${req.query.user}`)  /// redirect to above around
})

module.exports = router
