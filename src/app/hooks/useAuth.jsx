import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { localStorageService, setTokens } from "../services/localstorage.service";
import userServuse from "../services/users.servise";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState({});

    async function sugnUp({ email, password, ...rest }) {
        const url = "accounts:signUp";
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            const content = await userServuse.create({
                _id: data.localId,
                email,
                ...rest
            });
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorObj = { email: "Пользователь с таким email уже есть" };
                if (message === "EMAIL_EXISTS") {
                    throw errorObj;
                }
            }
        }
    }

    async function signIn(payload) {
        const url = "accounts:signInWithPassword";
        try {
            const { data } = await httpAuth.post(url, { ...payload, returnSecureToken: true });
            setTokens(data);
            const content = await userServuse.getById(data.localId);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorObj = { email: "Почта или пароль введены неверно." };
                if (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD") {
                    throw errorObj;
                }
            }
        }
    }

    function signOut() {
        localStorageService.deleteTokens();
        setCurrentUser(null);
    }

    async function getUser() {
        try {
            const id = localStorageService.getUserId();
            if (id) {
                const user = await userServuse.getById(id);
                setCurrentUser(user);
            }
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        console.log(error);
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    useEffect(() => {
        getUser();
    }, []);
    return (
        <AuthContext.Provider value={{ currentUser, sugnUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
