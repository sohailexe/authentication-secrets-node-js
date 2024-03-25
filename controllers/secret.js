const { request } = require('express')
const User = require('../models/user')
// const bcrypt = require('bcrypt')



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

exports.postRegister = async (req, res) => {
  // const hashedPassword = await bcrypt.hash(req.body.password, 12)
  const newUser = User({
    email: req.body.email,
    // password: hashedPassword
    password: req.body.password

  })

  try {
    const createdUser = await newUser.save()
  } catch (error) {
    console.log(error)
  }

  res.render('secrets')
}

exports.postLogin = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  try {
    const user = await User.find({ email: email })

    if (user.length < 1) {
      console.log('Email does not exist')
      res.redirect('/')
    } else {

      // const match = await bcrypt.compare( password,user[0].password)
      // if (match) {
        console.log(user);
      if (password==user[0].password) {
        res.render('secrets')
      } else {
        console.log('Invalid Password')
        res.redirect('/')
      }
    }
  } catch (error) {
    console.log(error)
  }
}
