
const mongo = require("mongoose");

const UserModel = mongo.Schema({
    UserName:{
        type:String,
        required:true
    },
    UserEmail:{
        type:String,
        required:true,
        unique:true
    },
    UserMobile:{
        type:String,
        required:true,
        unique:true
    },
    UserPassword:{
            type:String,
            required:true
    }
});


const UserModelUrl = mongo.model("UserDetails",UserModel);

module.exports = UserModelUrl;