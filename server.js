require('dotenv').config()
const express = require("express")
const app = express()
// Runs on process.env.PORT unless it doesn't exist > otherwise it'll use 3000

const PORT = process.env.PORT || 3000
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const session = require("express-session")
require("./db/db")

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride("_method"))


app.use((req,res,next)=>{
  // console.log("hitting the custom middleware");
  res.locals.loggedIn = req.session.loggedIn
  res.locals.username = req.session.username
  res.locals.userId = req.session.userId
  if(req.session.message) {
    res.locals.message = req.session.message
  }
  else {
    res.locals.message = undefined
  }

  req.session.message = undefined
  next()
})



const authController = require("./controllers/authController.js")
app.use("/auth",authController)

const userController = require("./controllers/userController.js")
app.use("/users",userController)

const photoController = require("./controllers/photoController.js")
app.use("/photos",photoController)

const messageController = require("./controllers/messageController.js")
app.use("/messages",messageController)



app.get('/', (req, res) => {
  res.render('index.ejs', {
  });
});

app.get('/user/new', (req, res, next) => {
    res.render('./user/create.ejs', {
    })
})

app.listen(PORT,() => {
	console.log(`server listening at ${PORT}, ${new Date}`);
})
