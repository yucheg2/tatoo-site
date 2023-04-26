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
    function getMasters() {
        try {
            mastersService.get().then((data) => { setMasters(data.data); });
        } catch (error) {
            toast.error("Ошибка в работе сервера");
        }
    }
    function updateRate(rate, masterid) {
        if (masters) {
            const master = Object.values(masters).find((m) => {
                return m._id === masterid;
            });
            const newRate = Math.floor((master.rate + rate) / 2);
            try {
                mastersService.updateRate(masterid, newRate);
            } catch (error) {
                toast.error("Ошибка в работе сервера");
            }
        }
    }
    return (
        <MastersContext.Provider value={{ masters, updateRate }}>
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
