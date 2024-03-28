const jwt = require("jsonwebtoken")

const VerifyToken = (token) =>{
    try {
        if (!token) {
            throw new Error({message:"invalid token"})
         }
      const verified =   jwt.verify(token , "secret")
      if (!verified) {
        throw new Error({message: "token expired"})
      }
      const email = verified.email
      return email;
    } catch (error) {
        throw new Error( "error verifying token")
    }
}



module.exports = {VerifyToken}