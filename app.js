//jshint esversion:6
require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const secretRouter = require("./routes/secret")

const app= express()

app.use(express.static("public"));

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended:true,
}))

app.use(secretRouter)

mongoose
  .connect(
    process.env.DB_URL
  ).then( (res) =>{
  


      app.listen(3000, function(){
          console.log("server started at port http://localhost:3000/");})
  })