import { useContext } from "react";
import { Appcontext } from "../globalVariables/AuthContext";
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }) => {
    const { user, loading } = useContext(Appcontext);

    console.log("Loading:", loading, "User:", user);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }

    if (user == null) {
        console.log("User not authenticated, redirecting to login.");
        return <Navigate to="/login" replace />;
    }

    console.log("User authenticated, rendering children.");
    return children; // Render protected content if user is authenticated
};
