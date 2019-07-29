const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const bcrypt  = require('bcryptjs');

router.post('/login', async (req, res, next) => {
  // Query database to verify that user exists
  try {
    const userFound = await User.findOne({username: req.body.username})

    if (userFound) {
      if (bcrypt.compareSync(req.body.password, userFound.password)) {
        req.session.userId = userFound._id;
        req.session.username = userFound.username;
        req.session.logged = true;

        res.redirect(`/photos`)
      } else {
        req.session.message = 'Incorrect password';
        res.redirect('/');
      }
    } else {
      req.session.message = 'Username not found';
      res.redirect('/');    }

  } catch (error) {
    next(err);
  }
})


router.post('/register', async (req, res) => {

  const password = req.body.password;

  // Encrypt inputed password
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  req.body.password = hashedPassword;

  try {
      const createdUser = await User.create(req.body);

      req.session.userId = createdUser._id;
      req.session.username = createdUser.username;
      req.session.logged = true;

      res.redirect('/photos');
  } catch (err){
    res.send(err)
  }

});

router.get('/logout', (req, res) => {

  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/');// back to the homepage
    }
  })

})

module.exports = router
