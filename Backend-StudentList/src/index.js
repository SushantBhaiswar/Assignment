const express = require("express");
const route = require("./route/route.js");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

mongoose.set('strictQuery', true);
mongoose
  .connect(
    "mongodb+srv://Sushant_Bhaiswar_30:WBYUu1bCYmxmZUmg@cluster0.jui41on.mongodb.net/Student-list?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then((data) => console.log("MongoDB is connected" + data.connection.host))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(3000, () => {
  console.log("Express app running on port " + 3000);
});