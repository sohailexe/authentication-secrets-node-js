const express = require("express")
const router = express.Router();

const secretController= require("../controllers/secret")

router.get("/",secretController.getAll)
router.get("/login",secretController.getLogin)
router.get("/logout",secretController.getLogout)
router.get("/register",secretController.getRegister)
router.get("/secret",secretController.getSecret)



router.post("/login",secretController.postLogin)
router.post("/register",secretController.postRegister)




module.exports = router;