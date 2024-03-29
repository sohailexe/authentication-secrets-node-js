// jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // Import LocalStrategy
const secretRouter = require("./routes/secret");
const User = require('./models/user');

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'randomSecretKey',
  resave: false,
  saveUninitialized: false
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy({
  usernameField: 'email',
},User.authenticate()));

// passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Route for secrets
app.use(secretRouter);

// Connect to MongoDB
mongoose.connect(process.env.DB_URL,{writeConcern: { w: 'majority', wtimeout: 0, provenance: 'clientSupplied' }})
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });
