const express = require("express")
const router = express.Router();

const secretController= require("../controllers/secret")

router.get("/",secretController.getAll)
router.get("/login",secretController.getLogin)
router.get("/register",secretController.getRegister)


module.exports = router;