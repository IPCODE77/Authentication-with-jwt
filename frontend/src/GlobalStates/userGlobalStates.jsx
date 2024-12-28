import { createContext, useEffect, useState } from "react";
import backendUrl from "../applicationProperties/database.json";
import axios from "axios";

export const Appcontext = createContext();


export const Appprovider = ({ children }) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const AuthUrl = await axios.get(`${backendUrl.development.localserver}/user/check-auth`, { withCredentials: true });
                console.log("Url-->", AuthUrl)
                setUser(AuthUrl.data.authUser);
                //localStorage.setItem("user",AuthUrl.data.)
            }
            catch (error) {
                console.log("Error-->", error);
            }
        };

        checkAuth();
    }, []);



    return (
        <Appcontext.Provider value={{ user, setUser }}>{children}</Appcontext.Provider>
    )

}