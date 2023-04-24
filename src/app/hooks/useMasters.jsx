import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import mastersService from "../services/mastersService";
const MastersContext = React.createContext();

const MastersProvider = ({ children }) => {
    const [masters, setMasters] = useState();
    useEffect(() => {
        getMasters();
    }, []);
    async function getMasters() {
        try {
            await mastersService.get().then((data) => { setMasters(data.data); });
        } catch (error) {
            toast.error("Ошибка в работе сервера");
        }
    }
    return (
        <MastersContext.Provider value={{ masters }}>
            {children}
        </MastersContext.Provider>
    );
};

export const useMasters = () => {
    return useContext(MastersContext);
};

export default MastersProvider;

MastersProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
