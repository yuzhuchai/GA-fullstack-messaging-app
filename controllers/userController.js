const express = require("express")
const router = express.Router()
const User = require("../models/user.js")

router.get('/user/edit', (req, res, next) => {
  res.redirect('/photos')
})


module.exports = router
