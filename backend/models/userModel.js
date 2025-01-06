
const mongo = require("mongoose");
const { type } = require("os");

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
    UserRole :{
        type:String
    },
    UserPassword:{
            type:String,
            required:true
    }
});


const UserModelUrl = mongo.model("UserDetails",UserModel);



const Student = mongo.Schema({
    StudentName :{
        type:String
    },
    createdBy:{
        type:String
    }
});


const StudentModel = mongo.model("StudentDetails",Student);

module.exports = {UserModelUrl,StudentModel};