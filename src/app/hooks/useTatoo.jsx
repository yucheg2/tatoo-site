import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import tattoosServase from "../services/tattoosServase";
import { toast } from "react-toastify";

const TatooContext = React.createContext();

const TatoosProvider = ({ children }) => {
    const [tatoos, setTatoos] = useState();
    const [loading, setLoading] = useState(true);
    const getTatoosBySrc = (src) => {
        if (tatoos) {
            return tatoos.find((t) => t.src === src);
        }
    };
    useEffect(() => {
        getTatoos();
    }, []);
    async function getTatoos() {
        try {
            await tattoosServase.get().then((data) => {
                setTatoos(Object.values(data.data));
            });
            setLoading(false);
        } catch (error) {
            toast.error("Ошибка в работе сервера");
        }
    }
    return (
        <TatooContext.Provider value={{ tatoos, loading, getTatoosBySrc }}>
            {children}
        </TatooContext.Provider>
    );
};

export const useTatoos = () => {
    return useContext(TatooContext);
};

export default TatoosProvider;

TatoosProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
