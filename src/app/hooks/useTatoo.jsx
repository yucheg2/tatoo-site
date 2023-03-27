import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import tattoosServase from "../services/tattoosServase";

const TatooContext = React.createContext();

const TatoosProvider = ({ children }) => {
    const [tatoos, setTatoos] = useState();
    const getTatoosBySrc = (src) => {
        return tatoos.find((t) => t.src === src);
    };
    useEffect(() => {
        tattoosServase.get().then((data) => {
            setTatoos(Object.values(data.data));
        });
    }, []);
    return (
        <TatooContext.Provider value={{ tatoos, getTatoosBySrc }}>
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
