const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
require('dotenv').config()
const ejs = require('ejs')
app.set("view engine", "ejs")

const userrouter = require('./Route/student.route')
const adminrouter = require('./Route/admin.route')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({origin:"*"}))
app.use('/student', userrouter)
app.use('/admin', adminrouter)

 

// const studentschema =  mongoose.Schema({
//     username:{type:String, required:true},
//     email:{type:String, unique:true, required:true},
//     password:{type:String, required:true},
// })
// const studentmodel = mongoose.model("student_collection", studentschema)

const port = process.env.PORT || 5008
const uri = process.env.MONGODB_URI

const connect = () =>{
    try {
     const connected =  mongoose.connect(uri) 
     if (connected) {
        console.log("connected to database");
     }
    } catch (error) {
       console.log(error);  
    }
}
connect()

app.listen(port,()=>{
   console.log("app started at port" + port);
})