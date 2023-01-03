const express = require("express")
const { Register, Login, gettoken } = require("./controller/usercontroller")
const { authenticate } = require("./middleware/middleware")
const Router = express.Router()


Router.post("/register", Register)
Router.post("/login", Login)
Router.post("/gettoken", authenticate, gettoken)
module.exports = Router