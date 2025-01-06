const { mongo } = require("mongoose");
const { UserModelUrl, StudentModel } = require("../models/userModel");
const { setUser, getUser } = require("../services/userServices");


async function handelUserCreation(req, res) {

    console.log("body-->", req.body);
    const { UserName, UserEmail, UserMobile, UserPassword, UserRole } = req.body;


    if (!req.body || !UserName || !UserEmail || !UserMobile || !UserPassword) return res.status(400).json({ msg: "Please Provide All Required Fields" });

    try {

        const newUser = await UserModelUrl.create({
            UserName: UserName,
            UserEmail: UserEmail,
            UserMobile: UserMobile,
            UserPassword: UserPassword,
            UserRole: UserRole
        });

        res.send({
            msg: "Success",
            code: 200,
            id: newUser._id
        });
    } catch (error) {

        console.log("User Not Create", error);
    }

}



async function handelUserLogin(req, res) {
    const { UserEmail, UserPassword } = req.body;

    console.log("Url Call");

    try {
        // Fetch the user from the database
        const logInUser = await UserModelUrl.findOne({ UserEmail: UserEmail });
        console.log("Login user-->", logInUser);

        // If user not found
        if (!logInUser) {
            return res.status(404).json({ msg: "User Not Found" });
        }

        // If password does not match
        if (UserPassword !== logInUser.UserPassword) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }

        const token = setUser(logInUser.toObject());
        //  res.cookie('SessionToken', token);
        return res.status(200).json({
            msg: "Success",
            token: token,
            authUser: logInUser,
        });
    } catch (error) {
        console.error("Error in login:", error);

        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


async function checkAuth(req, res) {

    try {
        // const userSession = req.cookies.SessionToken;

        const userSession = req.headers["authorization"];
        console.log("Authorization header-->", userSession);

        const BearerToken = userSession.split('Bearer ')[1]?.trim();

        console.log("Bearertoken-->", BearerToken);

        if (!userSession) {
            return res.status(400).json({ msg: "Not Authenticate" })
        }

        const authUser = getUser(BearerToken);
        console.log("Auth User-->", authUser);
        if (!authUser) {
            return res.status(400).json({ msg: "User Not Found" });

        }

        return res.status(200).json({ authUser });

    }
    catch (error) {
        console.log("error-->", error);
    }



}

async function logoutUser(req, res) {

    const cookie = req.cookies;

    console.log("cookie-->", cookie);

    try {

        res.clearCookie('SessionToken', '', '')
        res.status(200).send({
            msg: "log Out successfully",
            navigate: "/login"
        });
    }
    catch (error) {
        console.log("error-->", error);
    }


}


async function CreateStudent(req, res) {

    const { StudentName, token } = req.body;
    const loginDetials = getUser(token);
    console.log("login details-->", loginDetials);

    if (!StudentName) {
        return res.status(400).json({ msg: "Student Name INvalid" });
    }

    try {

        const student = await StudentModel.create({
            StudentName: StudentName,
            createdBy: loginDetials.UserEmail
        });

        res.send({
            msg: "Student Create Successfuly",
            studentid: student._id,
            code: 200
        })

    } catch (error) {
        console.log("Error-->", error);

    }

}


async function getAllStudent(req, res) {

    // console.log("student Req -->", req);
    const token = req.headers["authorization"].split("Bearer ")[1].trim();
    console.log("token-->", token);
    const tokenDetails = getUser(token);
    console.log("tokenDetails-->", tokenDetails);
    const userEmail = tokenDetails.UserEmail;
    try {


        if (tokenDetails.UserRole == "Admin") {
            const students = await StudentModel.find({});
            return res.send({
                msg: "Success",
                StudentList: students,
                code: 200
            })

        }
        else {
            const students = await StudentModel.find({ createdBy: userEmail });
            return res.send({
                msg: "Success",
                StudentList: students,
                code: 200
            })
        }
    }
    catch (error) {
        console.log("Error-->", error);
    }


}





module.exports = { handelUserCreation, handelUserLogin, checkAuth, logoutUser, CreateStudent, getAllStudent };