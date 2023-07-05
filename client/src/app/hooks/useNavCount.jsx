import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const NavCountContext = React.createContext();

const NavCountProvider = ({ children }) => {
    const store = localStorage.getItem("store");
    const storeCount = store && JSON.parse(store).length;
    const [currentCount, setCount] = useState(storeCount);
    function handleInc() {
        setCount(p => p + 1);
    }
    function handleDicr() {
        setCount(p => p - 1);
    }
    function clearCount() {
        setCount(0);
    }
    return (<NavCountContext.Provider value={{ clearCount, currentCount, handleDicr, handleInc }}>
        {children}
    </NavCountContext.Provider>);
};

export const useNavCount = () => useContext(NavCountContext);

export default NavCountProvider;

NavCountProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
