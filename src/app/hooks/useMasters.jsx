/* eslint-disable no-unsafe-finally */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import mastersService from "../services/mastersService";
import { useAuth } from "./useAuth";
import userServuse from "../services/users.servise";

const MastersContext = React.createContext();

const MastersProvider = ({ children }) => {
    const [masters, setMasters] = useState();
    const [waiting, setWaiting] = useState(false);
    const { currentUser, getUser } = useAuth();
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
    function takeOrder(tatoos, orderData) {
        const sendData = (toMaster) => ({
            date: orderData.date,
            order: JSON.stringify(tatoos),
            person: toMaster ? currentUser : orderData.master
        });
        setWaiting(() => true);
        try {
            Promise.all([mastersService.takeOrder(orderData.master, sendData(true)),
                userServuse.takeOrder(currentUser._id, sendData(false))])
                .then((data) => {
                    const issue = data.find((res) => typeof (res) === "string");
                    if (issue) {
                        toast.error(issue);
                        setWaiting(() => false);
                        if (!(data.every((res) => typeof (res) === "string"))) {
                            if (issue === "Мастер в этот день зянят.") {
                                userServuse.clearOrder(currentUser._id, orderData.date);
                            } else {
                                mastersService.clearOrder(orderData.master, orderData.date);
                            }
                        }
                    } else {
                        toast.success("Вы записаны на сеанс!");
                        getUser();
                        setWaiting(() => false);
                    }
                });
        } catch (error) {
            toast.error("Ошибка в работе сервера");
        }
    }

    function getMasterById(id) {
        return masters && masters[id];
    }
    return (
        <MastersContext.Provider value={{ waiting, masters, getMasterById, updateRate, takeOrder }}>
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
