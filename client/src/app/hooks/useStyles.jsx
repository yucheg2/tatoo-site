import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import stylesService from "../services/stylesService";
import { toast } from "react-toastify";
const StylesContext = React.createContext();

const StylesProvider = ({ children }) => {
    const [styles, setStyles] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getStyles();
    }, []);
    async function getStyles() {
        try {
            await stylesService.get().then((data) => { setStyles(data.data); });
            setLoading(false);
        } catch (error) {
            toast.error("Ошибка в работе сервера");
        }
    }
    return (
        <StylesContext.Provider value={{ styles, loading }}>
            {children}
        </StylesContext.Provider>
    );
};

export const useStyles = () => {
    return useContext(StylesContext);
};

export default StylesProvider;

StylesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
