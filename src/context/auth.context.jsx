/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isAnon, setIsAnon] = useState(false);

    const storeToken = (token) => {
        localStorage.setItem("authToken", token);
    };

    const authenticateUser = () => {
        const storedToken = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId"); //
    
        if (storedToken &&userId) {
            authService
            .verify()
            .then((response) => {
                // If the token is valid, set user state and login status
                setUser({...response.data.user, _id: userId}); // Assuming response contains user data
                setIsLoggedIn(true);
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                // If token verification fails, set login status to false
                setIsLoggedIn(false);
                setUser(null);
                setLoading(false);
                console.error("Token verification failed:", error);
            });
        } else {
            // If token is unavailable, set login status to false
            setIsLoggedIn(false);
            setUser(null);
            setLoading(false);
        }
    };
    

    const removeToken = () => {
        localStorage.removeItem("authToken");
    };

    const logOutUser = () => {
        removeToken();
        setIsLoggedIn(false);
        setUser(null);
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authenticateUser,
                user,
                loading,
                isLoggedIn,
                isOwner,
                isAnon,
                logOutUser,
                storeToken
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };
