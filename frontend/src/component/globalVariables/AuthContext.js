import React, { createContext, useState, useEffect } from 'react';
import backendUrl from "../../applicationProperties/database.json";
import axios from 'axios';
import { useNavigate } from 'react-router';

export const Appcontext = createContext();

export const Appprovider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        const checkAuth = async () => {
            const url = `${backendUrl.development.localserver}/user/check-auth`;
            console.log("Checking auth...", token);
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Auth response:", response);
                if (response.status === 200) {
                    setUser(response.data.authUser);
                }
            } catch (error) {
                console.log('Not authenticated in AuthContext:', error);
                setUser(null); 
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [token]); // Re-run when `token` changes.

    // Listen for localStorage changes (e.g., from login)
    useEffect(() => {
        const syncToken = () => {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
        };

        window.addEventListener('storage', syncToken);
        return () => window.removeEventListener('storage', syncToken);
    }, []);

    return (
        <Appcontext.Provider value={{ user, setUser, loading, token, setToken }}>
            {children}
        </Appcontext.Provider>
    );
};
