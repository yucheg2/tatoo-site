import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import sizesService from "../services/sizesService";

const SizesContext = React.createContext();

const SizesProvider = ({ children }) => {
    const [sizes, setSizes] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getSizes();
    }, []);
    async function getSizes() {
        try {
            await sizesService.get().then((data) => { setSizes(data.data); });
            setLoading(false);
        } catch (error) {
            toast.error("Ошибка в работе сервера");
        }
    }
    return (
        <SizesContext.Provider value={{ sizes, loading }}>
            {children}
        </SizesContext.Provider>
    );
};

export const useSizes = () => {
    return useContext(SizesContext);
};

export default SizesProvider;

SizesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
