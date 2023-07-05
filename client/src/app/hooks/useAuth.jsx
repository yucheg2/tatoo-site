import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { localStorageService, setTokens } from "../services/localstorage.service";
import userServuse from "../services/users.servise";
import mastersService from "../services/mastersService";

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
                if (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD" || message === "INVALID_EMAIL") {
                    throw errorObj;
                }
            }
        }
    }

    async function edit(newData, emailChanged) {
        const url = "accounts:update";
        const payload = { ...currentUser, ...newData };
        const accessToken = localStorageService.getAccessTokent();
        try {
            if (emailChanged) {
                const { data } = await httpAuth.post(url, { idToken: accessToken, email: payload.email, returnSecureToken: true });
                setTokens(data);
            }
            await userServuse.edit(payload);
            setCurrentUser(payload);
            toast.success("Данные изменены!");
        } catch (error) {
            const { message } = error.response.data.error;
            if (message === "CREDENTIAL_TOO_OLD_LOGIN_AGAIN") {
                const errObj = { password: "Введите пароль чтобы изменить почту" };
                throw errObj;
            }
            errorCatcher(error);
        }
    }

    async function cancelOrder(orderData, txt) {
        try {
            await Promise.all([
                userServuse.clearOrder(currentUser._id, orderData.date),
                mastersService.clearOrder(orderData.master, orderData.date)
            ]).then(() => {
                const newObj = {};
                Object.keys(currentUser.order).forEach((date) => {
                    if (date !== orderData.date) {
                        newObj[date] = currentUser.order[date];
                    };
                });
                setCurrentUser(p => ({ ...p, order: newObj }));
                toast.dark(txt);
            });
        } catch (error) {
            errorCatcher(error);
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
        <AuthContext.Provider value={{ currentUser, cancelOrder, edit, sugnUp, signIn, signOut, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
