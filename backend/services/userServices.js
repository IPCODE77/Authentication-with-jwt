const jwt = require("jsonwebtoken");

const secretKey = "IPCODE77";

function setUser(user){

    console.log("user in services-->");
     const payload = {
         _id: user._id,
         UserName: user.UserName,
         UserEmail: user.UserEmail,
         UserMobile: user.UserMobile,
         UserRole:user.UserRole
     };
     return jwt.sign(payload,secretKey,{expiresIn:"1h"});
}

function getUser(token){
    if(!token) return null;

    try{

        return jwt.verify(token,secretKey);
    }
    catch(error){
        console.log("error-->",error);
    }

}



module.exports = {
    setUser,getUser
}