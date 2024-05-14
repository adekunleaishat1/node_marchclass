const studentmodel = require('../model/admin.model')
const bcrypt = require('bcryptjs')
const {cloudinary} = require('../utils/cloudinary')
const {VerifyToken} = require("../service/sessionservice") 
const jwt = require("jsonwebtoken")


const getlandingpage = (req, res)=>{
    res.render("index")
}

const getadminsignup = (req, res) =>{
    res.render("signup")
}

const verifytoken = (req, res) =>{
    try {
      const token = req.headers.authorization.split(" ")[1]
      console.log(token);
     const email = VerifyToken(token)
     console.log(email);
      if(!email){
        res.status(401).send({message:"unable to verify token", status: false})
      }
      return res.status(200).send({message:"token verified", status: true})
    } catch (error) {
      console.log(error);
    }
      
  }