import { useLocation, useNavigate } from "react-router"
import { SubmitButton } from "../userLoginSignUp/signup";
import axios from "axios";
import backendUrl from "../../applicationProperties/database.json";
import { Navigate } from 'react-router-dom';
import { Appcontext, Appprovider } from "../globalVariables/AuthContext";
import { use, useContext, useEffect, useState } from "react";
import { SingUpParentDiv, FormWrapper, Title, ItemDiv, InputField, LabelName } from "../userLoginSignUp/signup"
import styled from "styled-components";


export const HomePage = () => {
    const navigate = useNavigate();
    const { user, setUser, loading, token } = useContext(Appcontext);
    const [Student, setStudent] = useState("");
    const [studentList, setStudentList] = useState([]);


    const handelUserLogOut = async () => {
        // const url = `${backendUrl.development.localserver}/user/logout`;

        try {
            // const logoutUser = await axios.post(url, {}, { withCredentials: true });

            // if (logoutUser.status === 200) {
            //     navigate('/login'); 
            // }

            localStorage.removeItem('token');
            setUser(null);
            return <Navigate to="/login" replace />
        } catch (error) {
            console.error("Error in logout -->", error.response || error.message);
        }
    };



    const AddStudent = async () => {

        const url = `${backendUrl.development.localserver}/user/createStudent`;
        const token = localStorage.getItem("token");
        const studentObject = {
            StudentName: Student,
            token: token
        }
        try {
            const student = await axios.post(url, studentObject, { withCredentials: true });
            console.log("Student-->", student);
            if (student.status == 200) {
                getAllStudentDetails();
            }
        }
        catch (error) {

        }


    }


    const getAllStudentDetails = async () => {

        const url = `${backendUrl.development.localserver}/user/getAllStudent`;
        const token = localStorage.getItem("token");
        try {

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("response-->", response);
            if (response.data.code == 200) {

                setStudentList(response.data.StudentList);
            }


        } catch (error) {

        }

    }

    const StudentnameDiv = styled.div`
    `;
    const StudentNameList = styled.div`
    `

    useEffect(()=>{
        getAllStudentDetails();
    },[]);

    return (
        <>
            <h3>Hii {user.UserName} Welcome Back!</h3>
            <SubmitButton style={{ width: 'auto' }} onClick={handelUserLogOut}>Log Out</SubmitButton>
            <LabelName>Student Name</LabelName>
            <InputField placeholder="Enter Name" id="studentName"
                type="text"
                value={Student}
                onInput={(e) => setStudent(e.target.value)}></InputField>
            <SubmitButton onClick={AddStudent}>Add Student</SubmitButton>

            <ul>
                {studentList.map((element, index) => (
                    <li key={index}>
                        {element.StudentName}
                    </li>
                ))}
            </ul>
        </>
    )
}