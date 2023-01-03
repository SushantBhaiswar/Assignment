const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const Router = require("./route")
const cors = require("cors")
const Cookiparser = require("cookie-parser")

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://Sushant_Bhaiswar_30:WBYUu1bCYmxmZUmg@cluster0.jui41on.mongodb.net/sample-db?retryWrites=true&w=majority")
    .then(() => {
        console.log("mongodb is connected")
    })
    .catch((err) => {
        console.log(err.message);
    })
app.use(Cookiparser())
app.use(cors())
app.use(express.json())
app.use("/", Router)

app.listen(3001, () => {
    console.log("Express app is running on port 3001");
})