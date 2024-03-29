const { request } = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')


exports.getAll = (req, res) => {
  res.render('home')
}

exports.getLogin = (req, res) => {
  res.render('login')
}
exports.getLogout = (req, res) => {
  res.redirect('/')
}

exports.getRegister = (req, res) => {
  res.render('register')
}
exports.getSecret = (req, res) => {
  console.log("secret");

  if(req.isAuthenticated()){
    res.render('secrets')
  }else{
    res.redirect('/login')
  }
}

exports.postRegister = async (req, res) => {
  User.register(new User({ email : req.body.email }), req.body.password, function(err, user) {
    if (err) {
        return res.send(err);
    }
    passport.authenticate('local')(req, res, function () {
    console.log("abc");

      res.redirect('/secret');
    });
  });
};

  
    

exports.postLogin = async (req, res) => {
  const user =new User({
    email: req.body.email,
    password: req.body.password
  })

  req.login(user, function(err){
    if (err) {
      console.log(err);
    }else{
      passport.authenticate('local')(req,res,function(){
        res.redirect('/secret')
      })
    }
  })
  
}
