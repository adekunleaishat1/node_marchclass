const yup = require("yup")

const emailregex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const adminvalidation = yup.object().shape({
    username: yup.string().min(5, "username must not be less than 5 characters")
        .required("username, is required"),
    email: yup.string().required("email is required").matches(emailregex, "email must be valid"),
    password: yup.number().required("password is required")
    .min(8, "password must be eight '8' in number")
})






module.exports = { adminvalidation, }