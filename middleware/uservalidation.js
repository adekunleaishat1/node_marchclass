const yup = require("yup")

const emailregex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const uservalidation = yup.object().shape({
    username: yup.string().min(5, "username must not be less than 5 characters")
        .required("username, is required"),
    firstname: yup.string().min(5, "username must not be less than 5 characters")
        .required("firstname, is required"),
    lastname: yup.string().min(5, "username must not be less than 5 characters")
        .required("lastname, is required"),
    email: yup.string().required("email is required").matches(emailregex, "email must be valid"),
    password: yup.number().required("password is required")
})

const signinValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required email")
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
    password: yup
        .string()
        .matches(/^.{8,}$/, 'Password must be at least 8 characters long.')
        .required('Password is required.'),
})




module.exports = { uservalidation, signinValidationSchema}