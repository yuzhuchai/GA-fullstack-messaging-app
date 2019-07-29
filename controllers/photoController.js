const express = require("express")
const router = express.Router()
const Photo = require("../models/photo.js")
const User = require("../models/user.js")
const multer = require("multer")
const fs = require("fs")

const upload = multer({dest: "uploads"})

//photo index route,
router.get("/:userId", async (req,res,next)=>{
	console.log('u hit da route {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}');
	try{
		if(req.session.loggedIn === true) {
			const foundPhotos = await Photo.find({"user": req.params.userId}).populate("user")
			res.render("photo/index.ejs",{
				photos: foundPhotos
			})
		} else {
			res.render("/login")
		}
	}catch(err){
		next(err)
	}
})



//photo new route
router.get("/new", (req,res,next)=>{
	res.render("photo/create.ejs")
})

//photo post route
//!!!!!!!!!!!!!!attention!!!!!!!!!!!!
//need to add the user info to the created photos.
router.post("/", upload.single('photo'), async (req,res,next)=>{
	// console.log(req.file);
	// res.send(req.file)
	//creates a file inside the uplaods folder.
	const filePath = req.file.path
	// console.log(req.body);
	const createdPhoto = new Photo
	try{

		createdPhoto.title = req.body.title
		createdPhoto.date = req.body.date
		createdPhoto.photo.data = fs.readFileSync(filePath)
		createdPhoto.photo.contentType = req.file.mimetype

		const userFound = await User.findById(req.session.userId)
		userFound.allPhotoIds.unshift(createdPhoto._id)
		createdPhoto.user.push(userFound)

		await createdPhoto.save()
		console.log(createdPhoto, "<-------this is uploaded photo")
		res.redirect(`/photos/${createdPhoto.id}`)
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
router.get("/:id", async (req,res,next)=>{
	try{
		const foundPhoto = await Photo.findById(req.params.id).sort("-date")
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



module.exports = router
