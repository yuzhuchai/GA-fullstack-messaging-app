const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const bcrypt  = require('bcryptjs');

router.post('/login', async (req, res, next) => {
  // Query database to verify that user exists
  try {
    const userFound = await User.findOne({username: req.body.username})

    if (userFound) {
      if (bcrypt.compareSync(userFound.password, req.body.password)) {
        req.session.userId = userFound._id;
        req.session.username = userFound.username;
        req.session.logged = true;

        res.redirect(`/photos/${userFound.latestUploadId}`)
      }
    }

  } catch (error) {
    next(err);
  }
})




module.exports = router
