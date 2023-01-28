const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

// import route

const users = require("./routes/userroutes");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

connectDB();

app.use("/", users);

app.get("/", (req, res) => {
  res.send("Social Network Server is Connected");
});
app.listen(port, (req, res) => {
  console.log("Social Network Port Is", port);
});
