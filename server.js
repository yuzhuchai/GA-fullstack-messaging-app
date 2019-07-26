const express = require("express")
const app = express()
const PORT = 3000
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const session = require("express-session")
require("./db/db")

app.use(session({
	secret: "THIS IS A RANDOM SECRET STRING",
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride("_method"))

const authController = require("./controllers/authController.js")
app.use("/auth",authController)

const userController = require("./controllers/userController.js")
app.use("/users",userController)

const photoController = require("./controllers/photoController.js")
app.use("/photos",photoController)

const messageController = require("./controllers/messageController.js")
app.use("/messages",messageController)


app.listen(PORT,() => {
	console.log(`server listening at ${PORT}, ${new Date}`);
})