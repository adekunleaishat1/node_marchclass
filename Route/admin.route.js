const express = require('express')
const { getlandingpage, getadminsignup, verifytoken, adminlogin, adminsignup } = require('../controller/admin.controller')
const router = express.Router()
const {validate} = require("../middleware/validator")
const {uservalidation} = require("../middleware/adminvalidation")


router.get('/', getlandingpage)
router.get("/signup", getadminsignup)
router.get('/verify', verifytoken)
router.post('/signup', adminsignup)
router.post('/login', adminlogin)
router.post('/upload', uploadimage)
// router.get('/signup',(req, res)=>{
//   res.render("admin")
// })


module.exports = router