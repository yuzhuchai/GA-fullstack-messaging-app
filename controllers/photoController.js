const express = require("express")
const router = express.Router()
const Photo = require("../models/photo.js")
const multer = require("multer")
const fs = require("fs")

const upload = multer({dest: "uploads"})

//photo index route, 
router.get("/",(req,res,next)=>{
	res.render("photo/index.ejs")
})


//photo new route 
router.get("/new", (req,res,next)=>{
	res.render("photo/create.ejs")
})


//photo post route 
router.post("/", upload.single('photo'), async (req,res,next)=>{
	// console.log(req.file);
	// res.send(req.file)
	//creates a file inside the uplaods folder.
	const filePath = req.file.path
	// console.log(req.body);
	const createdPhoto = new Photo
	createdPhoto.title = req.body.title
	createdPhoto.date = req.body.date
	createdPhoto.photo.data = fs.readFileSync(filePath)
	createdPhoto.photo.contentType = req.file.mimetype

	await createdPhoto.save()
	console.log(createdPhoto, "<-------this is uploaded photo");


})

module.exports = router
