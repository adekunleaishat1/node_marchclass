const studentmodel = require('../model/student.model')


const studentsignup = async(req, res) =>{
try {
    console.log( req.body, "body");
    const {username, email, password} = req.body
     const student = await studentmodel.create({username, email, password})
     if (student) {
       console.log("user signed up successfully");
     }else{
        console.log("error occured while posting user");
     }
} catch (error) {
    console.log(error);
}
}
const getstudentsignup = (res, req) =>{
    res.render("signup")
}
const getlandingpage = (res, req)=>{
    res.render("index")
}


module.exports = {studentsignup, getlandingpage, getstudentsignup}