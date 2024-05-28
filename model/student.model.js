const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const studentschema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profile: { type: String },
    registrationDate : { type: Date,default:Date.now()},
})
let saltRound = 10

studentschema.pre("save", function (next) {
    console.log(this.password);
    bcrypt.hash(this.password, saltRound).then((hashpassword) => {
        this.password = hashpassword
        next()
    }).catch((err) => {
        console.log(err);
    })

})
const studentmodel = mongoose.model("student_collection", studentschema)
// const studentModel = mongoose.models.student_collections || mongoose.model("student_collections", );

module.exports = studentmodel