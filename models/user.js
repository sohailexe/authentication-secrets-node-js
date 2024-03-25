const mongoose = require("mongoose")
const {Schema } = mongoose;

const encrypt = require("mongoose-encryption")


// const userSchema= new Schema({
const userSchema= new mongoose.Schema({
    email: String,
    password: String,
})
 
// userSchema.plugin(encrypt,{secret:MY_SECRET_KEY})//this encrypt all the database
userSchema.plugin(encrypt,{secret: process.env.ENCRYPTION_SECRET , encryptedFields:["password"]} )//this encrypt only certine fields

//these process incrypt while save and decrypt while find() all other code work same
module.exports = mongoose.model("User",userSchema)
