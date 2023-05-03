import React, { useState } from "react";
import PropTypes from "prop-types";
import formateOrders from "../../../utils/formatedOrders";
import RadioGroupField from "../../common/Form/radioGroupField/radioGroupField";
import OrderBlock from "./orderBlock";
import "./index.css";

const Celendar = ({ order }) => {
    const ordersObj = formateOrders(order);
    const dates = Object.keys(ordersObj);
    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const handleChange = (data) => {
        setSelectedDate(data.dates);
    };
    return (<div className="celendar">
        <h1 className="text-center border-bottom mb-3">Календарь сеансов</h1>
        <div className="d-flex">
            <RadioGroupField showCircle={false} display="d-flex flex-column" arr={dates} name="dates" onChange={handleChange} value={selectedDate}/>
            <OrderBlock {...ordersObj[selectedDate]}/>
        </div>

    </div>);
};

export default React.memo(Celendar);

Celendar.propTypes = {
    order: PropTypes.object
};
