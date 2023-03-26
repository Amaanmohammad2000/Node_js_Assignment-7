const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 8080;
const router_student = require("./routes/student");
const dotenv = require("dotenv");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
mongoose.connect("mongodb://localhost/students")
.then((res)=>{
    console.log("Connected to DB");
}) 
    
app.use("/api", router_student);

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   