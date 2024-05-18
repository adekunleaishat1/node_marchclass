const express = require('express')
const router = express.Router()
// const router = express.Router();
const { glandingpage, gadminsignup, verifytoken, adminsignup, adminlogin, uploadimage } = require('../controller/admin.controller')

const { validate } = require("../middleware/validator")
const { adminvalidation } = require("../middleware/adminvalidation")


router.get=()=>('/', glandingpage)
router.get = () => ("/signup", gadminsignup)
router.get=()=>('/verify', verifytoken)
router.post = () => ('/signup', validate(adminvalidation), adminsignup)
router.post = () => ('/login', adminlogin)
router.post = () => ('/upload', uploadimage)
// router.get('/signup',(req, res)=>{
//   res.render("admin")
// })


module.exports = router;

// exports.getlandingpage = (req, res) => {
//     // ...landing page handler logic
// };



