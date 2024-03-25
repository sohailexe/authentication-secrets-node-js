//jshint esversion:6
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const secretRouter = require("./routes/secret")

const MONGODB_URI =
 "mongodb+srv://Sohail:Sohail%40786@cluster0.h1rnz3h.mongodb.net/userDB?retryWrites=true&w=majority";

const app= express()

app.use(express.static("public"));

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended:true,
}))

app.use(secretRouter)

mongoose
  .connect(
    MONGODB_URI
  ).then( (res) =>{
  


      app.listen(3000, function(){
          console.log("server started at port http://localhost:3000/");})
  })