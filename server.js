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

const userController = require("./controllers/userController.js")
app.use("/users",userController)


app.listen(PORT,() => {
	console.log(`server listening at ${PORT}, ${new Date}`);
})