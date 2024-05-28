const studentmodel = require('../model/student.model')
// const bcrypt = require('bcryptjs')
const bcryptjs = require("bcryptjs");
const {cloudinary} = require('../utils/cloudinary')
const {VerifyToken} = require("../service/sessionservice") 
const jwt = require("jsonwebtoken")
const {uservalidation } = require("../middleware/uservalidation")

const studentsignup = async(req, res) =>{
try {
    console.log( req.body, "body");
    const {username, firstname, lastname, email, password} = req.body
    if (username == "" || password == "" || email == "" || lastname == "" || firstname == "") {
       res.status(402).send({message:"input fiels cannot be empty", status: false}) 
    }
    //  const validate = await uservalidation.validate(req.body)
    //  if (!validate) {
    //   res.status(400).send({message:"unable to validate user", status:false})
    //  }
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
     console.log("Details has saved to database");
} catch (error) {
    console.log(error);
    if (error) {
      res.status(407).send({message:error.message})
    }
  return res.status(500).send({message:"interal server error", status:false})
}
}

const studentlogin = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  // let secret = secret;
  let firstname = req.body.firstname
  try {
    await studentmodel.find({ email: email }).then((result) => {
      if (result.length === 0) {
        res.status(404).send({ message: "You don't have an account with us", status: false })
      } else {
        bcryptjs.compare(password, result[0].password).then((result2) => {
          console.log(result2)
          console.log(password);
          if (result2) {
            const token = jwt.sign({ email }, "secretkey", { expiresIn: 90 })
            console.log(token)
            res.status(200).send({ message: "Welcome" + result[0].firstname, status: true, token })
            res.send.body
          } else {
            res.status(401).send({ message: "Invalid password", status: false })
          }
        })
      }
    }).catch((error) => {
      console.log(error)
      res.status(500).send({ message: "Sign in failed", status: false })
    })
  } catch (error) {
    return next(error)
  }
}
// const studentlogin = async(req, res)=>{
//    try {
//        const {email , password } = req.body
//        if (email == "" || password == "") {
//         res.status(402).send({message:"input field cannot be empty", status: false})
//        }
//       const user = await studentmodel.findOne({email:email})
//       if (!user) {
//         res.status(407).send({message:"user does not exist , plsease sign up", status: false})
//       }
      
//       console.log(user);
//       const hashpassword = await bcrypt.compare(password , user.password)
//         if (!hashpassword) {
//             res.status(409).send({message:"invalid password", status: false}) 
//         }
//         const useremail = user.email
        
//         jwt.sign({email}, "secret", {expiresIn:40},(err, result)=>{
//           if (err) {
//             console.log(err);
//             res.status(400).send({message:"unable to generate token", status: false}) 
//           }else{
//             console.log(result ,)
//             let token = result
//             return res.status(200).send({message:"user login successful", status:true,useremail, token })
//            res.send.body
//           }

//         })
       
//    } catch (error) {
//     console.log(error);
//     res.status(500).send({message:"interal server error", status:false})
//    }
// }

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
    
    // jwt.verify(token, "secret",(err, result)=>{
    //     if(err){
    //       console.log(err);
    //       res.status(401).send({message:"unable to verify token", status: false})
    //     }else{
    //       console.log(result);
    //      return res.status(200).send({message:"token verified", status: true})
    //     }
    // })
}

const uploadimage = async (req, res) =>{
   const {image , email} = req.body
   console.log(image);
  const uploder = await cloudinary.uploader.upload(image);
  console.log(uploder.secure_url);
  let myimage = uploder.secure_url
  if (!uploder) {
    res.status(400).send({message:"error occured", status: false})
  }
 const profileimage = await studentmodel.findOneAndUpdate(
    {email: email},
    {$set:{profile: myimage}},
    {new: true}
  )
  if (!profileimage) {
    res.status(405).send({message:"unable to update profile", status: false})
  }

  return res.status(200).send({message:"upload successful", status:true, myimage})

}

const geTdashboard = (req, res) => {
  let token = req.headers.authorization.split(" ")[1]
  console.log(token, "token")
  jwt.verify(token, "secretkey", (error, result) => {
    if (error) {
      console.log(error, "error");
      res.status(401).send({ message: "you can never make it ", status: false })
      //  return next(error)
    } else {
      let email = result.email
      res.status(200).send({ message: "congrate", status: true, email: email })
      console.log(result)

    }
  })
}

const getstudentsignup = (req, res) =>{
    res.render("signup")
}
const getlandingpage = (req, res)=>{
  res.send([
    { name: "devnonso", age: 22 },
    { name: "exhibit", age: 20 },
    { name: "obasi", age: 19 },
  ]);
};


module.exports = {studentsignup, getlandingpage, getstudentsignup, studentlogin, uploadimage,verifytoken }