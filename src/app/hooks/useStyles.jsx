import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import stylesService from "../services/stylesService";
const StylesContext = React.createContext();

const StylesProvider = ({ children }) => {
    const [styles, setStyles] = useState();
    useEffect(() => {
        stylesService.get().then((data) => { setStyles(data.data); });
    }, []);
    return (
        <StylesContext.Provider value={{ styles }}>
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
