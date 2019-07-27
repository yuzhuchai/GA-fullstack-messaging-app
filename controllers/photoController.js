const express = require("express")
const router = express.Router()
const Photo = require("../models/photo.js")
const multer = require("multer")
const fs = require("fs")

const upload = multer({dest: "uploads"})


router.get("/new", (req,res,next)=>{
	res.render("photo/create.ejs")
})

module.exports = router
