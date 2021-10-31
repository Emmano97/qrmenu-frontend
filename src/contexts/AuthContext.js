import React, {createContext, useState} from 'react';
import { signIn as signInApi, register as registerApi } from '../apis';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(false)

    const signIn = async (username, password, calback) => {
        setLoading(true);
        const response = await signInApi(username, password);

        if(response && response.auth_token){
            localStorage.setItem("token", response.auth_token);
            setToken(response.auth_token);
            calback();
        }
    }

    const register = async (username, password, calback) => {
        setLoading(true);
        const response = await registerApi(username, password);

        if(response && response.id){
            calback();
        }
        setLoading(false)
    }

    const signOut = () => {
        localStorage.removeItem("token");
        setToken("")
    }


    const value = {
        token,
        signIn,
        signOut,
        register,
    };

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}

export default AuthContext;