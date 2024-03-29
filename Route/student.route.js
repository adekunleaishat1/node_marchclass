const express = require("express")
const router = express.Router()
const {studentsignup, getlandingpage, getstudentsignup, studentlogin, uploadimage, verifytoken} = require("../controller/student.controller")


router.get('/', getlandingpage)
router.get("/signup", getstudentsignup)
router.post('/register', studentsignup)
router.post('/login', studentlogin)
router.post('/upload', uploadimage)
router.get('/verify', verifytoken)




module.exports = router