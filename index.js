const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
require('dotenv').config()
const ejs = require('ejs')
app.set("view engine", "ejs")

const userrouter = require('./Route/student.route')
// const adminrouter = require('./Route/admin.route')
const adminrouter = require('./Route/admin.route')
app.use(express.urlencoded({extended:true, limit:"100mb"}))
app.use(express.json({limit:"100mb"}))
app.use(cors({origin:"*"}))
app.use('/student', userrouter)
app.use('/admin', adminrouter)
 const socket = require("socket.io")


const port = process.env.PORT || 5008
const uri = process.env.MONGODB_URI

// const connect = () =>{
//     try {
//      const connected =  mongoose.connect(uri) 
//      if (connected) {
//         console.log("connected to database");
//      }
//     } catch (error) {
//        console.log(error);  
//     }
// }

const connect = async () => {
   const uri = process.env.MONGO_URI;
   try {
     mongoose.set("strictQuery", false);
     await mongoose.connect(uri);
     console.log("MongoDB connected");
   } catch (error) {
     console.log(error);
   }
 };
connect()

const connection = app.listen(port,()=>{
   console.log("app started at port" + port);
})
let io = socket(connection, {
   cors:{origin:"*"}
})

io.on("connection",(socket)=>{
   console.log("A user connected successfully");
   socket.on("newmessage",(message)=>{
      console.log(message);
      io.emit("receivemessage", message)
   })
})