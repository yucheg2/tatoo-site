import React, { useState } from "react";
import PropTypes from "prop-types";
import formateOrders from "../../../utils/formatedOrders";
import RadioGroupField from "../../common/Form/radioGroupField/radioGroupField";
import OrderBlock from "./orderBlock";
import "./index.css";
import OrderCheck from "./orderCheck";
import { useAuth } from "../../../hooks/useAuth";

const Celendar = ({ order }) => {
    const ordersObj = formateOrders(order);
    const dates = Object.keys(ordersObj);
    const { cancelOrder } = useAuth();
    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const [selectedTatoo, setSelectedTatoo] = useState(null);
    const handleChange = (data) => {
        setSelectedDate(data.dates);
        setSelectedTatoo(null);
    };

    const handleOrderCheck = (data) => {
        setSelectedTatoo({ ...data, place: [data.place] });
    };

    const handleCloseOrderCheck = () => {
        setSelectedTatoo(null);
    };

    const handleCancel = async(data) => {
        await cancelOrder(data);
        setSelectedDate(dates[0]);
    };

    return (
        <div className="celendar">
            <h1 className="text-center border-bottom mb-3">Календарь сеансов</h1>
            <div className="d-flex">
                <RadioGroupField showCircle={false} display="d-flex flex-column" arr={dates} name="dates" onChange={handleChange} value={selectedDate}/>
                <div className="flex-auto border rounded-3 p-3">
                    {selectedTatoo
                        ? <OrderCheck order={selectedTatoo} onClose={handleCloseOrderCheck}/>
                        : <OrderBlock onCancel={handleCancel} onOrder={handleOrderCheck} {...ordersObj[selectedDate]}/>}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Celendar);

Celendar.propTypes = {
    order: PropTypes.object
};
