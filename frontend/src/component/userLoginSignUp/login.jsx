
import { useContext, useState } from "react"
import { SingUpParentDiv,SubmitButton, FormWrapper, Title, ItemDiv, InputField, LabelName } from "./signup"
import axios from "axios";
import backendUrl from "../../applicationProperties/database.json";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Appcontext,Appprovider } from "../globalVariables/AuthContext";



export const LoginForm = () => {
    const [loginEmail, setlogintEmail] = useState('');
    const [loginPsw, setLoginpsw] = useState('');
    const [loginObject, setloginObject] = useState({
        loginEmail: '',
        loginPsw: ''});
    const navigate = useNavigate();  
    const {user,setUser} = useContext(Appcontext);
    const {token,setToken} = useContext(Appcontext);
    
    const handelLoginButton = () =>{
        const newObject = {
            UserEmail:loginEmail,
            UserPassword:loginPsw
        }

        handelLoginMatch(newObject)
    }   
  
    const handelLoginMatch = async(newObject) =>{

        const logInUrl = `${backendUrl.development.localserver}/user/loginUser`;
         try{
             const getLogInInfo = await axios.post(logInUrl,newObject,{ withCredentials: true } );
             if(getLogInInfo.data.msg == "Success"){

                setUser(getLogInInfo.data.authUser);
                localStorage.setItem("token",getLogInInfo.data.token);
                setToken(getLogInInfo.data.token);
                navigate("/home")
             }
         }
         catch(error){
            console.log("Error-->",error);
         }

    }

    if(user){
        return <Navigate  to="/home" replace />
    }
    return (
        <>
            <SingUpParentDiv>
                <FormWrapper>
                    <Title>Welcome Back!</Title>

                    <ItemDiv>
                        <LabelName>Email Address</LabelName>
                        <InputField
                            type="email"
                            placeholder="Enter Email Address..."
                            value={loginEmail}
                            onInput={(e) => setlogintEmail(e.target.value)}
                        />
                    </ItemDiv>
                    <ItemDiv>
                        <LabelName>Password</LabelName>
                        <InputField
                            type="password"
                            placeholder="Enter Password..."value={loginPsw}
                            onInput={(e) => setLoginpsw(e.target.value)}
                        />
                    </ItemDiv>
                    <SubmitButton onClick={handelLoginButton}>Log In</SubmitButton>
                </FormWrapper>
            </SingUpParentDiv>

        </>
    )
}