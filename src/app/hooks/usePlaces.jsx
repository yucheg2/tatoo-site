import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import placesService from "../services/placesService";

const PlacesContext = React.createContext();

const PlacesProvider = ({ children }) => {
    const [places, setplaces] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getPlaces();
    }, []);
    async function getPlaces() {
        try {
            await placesService.get().then((data) => { setplaces(data.data); });
            setLoading(false);
        } catch (error) {
            toast.error("Ошибка в работе сервера");
        }
    }
    return (
        <PlacesContext.Provider value={{ places, loading }}>
            {children}
        </PlacesContext.Provider>
    );
};

export const usePlaces = () => {
    return useContext(PlacesContext);
};

export default PlacesProvider;

PlacesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
