const studentmodel = require('../model/student.model')
const bcrypt = require('bcryptjs')


const studentsignup = async(req, res) =>{
try {
    console.log( req.body, "body");
    const {username, email, password} = req.body
    if (username == "" || password == "" || email == "") {
       res.status(402).send({message:"input fiels cannot be empty", status: false}) 
    }
    const existinguser = await studentmodel.findOne({email:email})
     console.log(existinguser);
     if (existinguser) {
        res.status(405).send({message:"user already exist", status:false})
     }
     const student = await studentmodel.create({username, email, password})
     if (!student) {
        res.status(409).send({message:"unable to save user", status:false})
     }
     return res.status(200).send({message:"user signed up successfully", status:true})
} catch (error) {
    console.log(error);
    res.status(500).send({message:"interal server error", status:false})
}
}

const studentlogin = async(req, res)=>{
   try {
       const {email , password } = req.body
       if (email == "" || password == "") {
        res.status(402).send({message:"input field cannot be empty", status: false})
       }
      const user = await studentmodel.findOne({email:email})
      if (!user) {
        res.status(407).send({message:"user does not exist , plsease sign up", status: false})
      }
      console.log(user);
      const hashpassword = await bcrypt.compare(password , user.password)
        if (!hashpassword) {
            res.status(409).send({message:"invalid password", status: false}) 
        }
        return res.status(200).send({message:"user login successful", status:true})

   } catch (error) {
    console.log(error);
    res.status(500).send({message:"interal server error", status:false})
   }
}


const getstudentsignup = (req, res) =>{
    res.render("signup")
}
const getlandingpage = (req, res)=>{
    res.render("index")
}


module.exports = {studentsignup, getlandingpage, getstudentsignup, studentlogin}