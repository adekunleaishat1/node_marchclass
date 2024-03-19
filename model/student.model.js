const mongoose = require('mongoose')

const studentschema =  mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
})
const studentmodel = mongoose.model("student_collection", studentschema)

module.exports = studentmodel