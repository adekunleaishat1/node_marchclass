const express = require("express")
const router = express.Router()
const {studentsignup, getlandingpage, getstudentsignup} = require("../controller/student.controller")


router.get('/', getlandingpage)
router.get("/signup", getstudentsignup)
router.post('/register', studentsignup)



module.exports = router