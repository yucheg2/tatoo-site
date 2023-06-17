import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import formateOrders from "../../../utils/formatedOrders";
import RadioGroupField from "../../common/Form/radioGroupField/radioGroupField";
import OrderBlock from "./orderBlock";
import "./index.css";
import OrderCheck from "./orderCheck";
import { useAuth } from "../../../hooks/useAuth";
import CommentsForm from "../commentsModal/commentsForm";

const Celendar = ({ order }) => {
    const ordersObj = formateOrders(order);
    const dates = Object.keys(ordersObj);
    const { cancelOrder } = useAuth();
    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const [selectedTatoo, setSelectedTatoo] = useState(null);
    const [feedbackMode, setFeedbackMode] = useState(false);
    const handleChange = (data) => {
        setSelectedDate(data.dates);
    };

    const handleOrderCheck = (data) => {
        setSelectedTatoo({ ...data, place: [data.place] });
    };

    const handleCloseOrderCheck = () => {
        setSelectedTatoo(null);
    };

    const handleCancel = async(data) => {
        await cancelOrder(data, "Заказ отменен");
        setSelectedDate(dates[0]);
    };

    const handleToggleFeedback = () => {
        setFeedbackMode(p => !p);
    };

    const handleSendFeedback = async() => {
        const orderObject = ordersObj[selectedDate];
        await cancelOrder({ master: orderObject.master.id, date: orderObject.date }, "Отзыв отправлен.");
        setFeedbackMode(false);
        setSelectedDate(dates[0]);
    };

    useEffect(() => {
        setSelectedTatoo(null);
        setFeedbackMode(false);
    }, [selectedDate]);

    return (
        <div className="celendar">
            <h1 className="text-center border-bottom mb-3">Календарь сеансов</h1>
            {dates && dates.length > 0
                ? <div className="d-flex">
                    <RadioGroupField showCircle={false} display="d-flex flex-column" arr={dates} name="dates" onChange={handleChange} value={selectedDate}/>
                    <div className="flex-auto border rounded-3 p-3">
                        {selectedTatoo
                            ? <OrderCheck order={selectedTatoo} onClose={handleCloseOrderCheck}/>
                            : feedbackMode
                                ? <CommentsForm masterId={ordersObj[selectedDate]?.master?.id} onSubmit={handleSendFeedback} onClose={handleToggleFeedback}/>
                                : ordersObj[selectedDate] && <OrderBlock onFeedback={handleToggleFeedback} onCancel={handleCancel} onOrder={handleOrderCheck} {...ordersObj[selectedDate]}/>}
                    </div>
                </div>
                : <h2 className="text-center color-fg-subtle">У вас нет сеансов</h2>}
        </div>
    );
};

export default React.memo(Celendar);

Celendar.propTypes = {
    order: PropTypes.object
};
