import { useLocation, useNavigate } from "react-router"
import { SubmitButton } from "../userLoginSignUp/signup";
import axios from "axios";
import backendUrl from "../../applicationProperties/database.json";

import { Appcontext,Appprovider } from "../../GlobalStates/userGlobalStates";
import { use, useContext } from "react";


export const HomePage = () => {
    const location = useLocation('');
    const navigate = useNavigate();
    const {user,setUser,loading} = useContext(Appcontext);

    console.log("user-->",user);
    


    const handelUserLogOut = async () => {
        const url = `${backendUrl.development.localserver}/user/logout`;


        try {
            const logoutUser = await axios.post(url, {}, { withCredentials: true });

            if (logoutUser.status === 200) {
                navigate('/login'); 
            }
        } catch (error) {
            console.error("Error in logout -->", error.response || error.message);
        }
    };

    if(loading){
            <h3>Loading...</h3>
    }

    if(user ==  null){
        navigate("/login");
        return null;
    }

    return (
        <>
            <h3>Hii {user.UserName} Welcome Back!</h3>
            <SubmitButton style={{ width: 'auto' }} onClick={handelUserLogOut}>Log Out</SubmitButton>

        </>
    )
}