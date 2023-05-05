import React from "react";
import PropTypes from "prop-types";
import TatooForm from "../tatooForms/tatooForm";

const OrderCheck = ({ order, onClose }) => {
    return (
        <div className="first-page d-flex">
            <img src={`/${order.src}`} alt="" className="img-modal mr-4 color-shadow-large"/>
            <div className="d-flex flex-column">
                <TatooForm tatoo={order}/>
                <button onClick={onClose} className="btn flex-self-end">назад</button>
            </div>
        </div>);
};

export default OrderCheck;

OrderCheck.propTypes = {
    order: PropTypes.object,
    onClose: PropTypes.func
};
