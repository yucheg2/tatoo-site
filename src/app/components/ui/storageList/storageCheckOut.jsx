import React from "react";
import PropTypes from "prop-types";
import DateField from "../../common/Form/dateField/dateField";

const StorageCheckOut = ({ price }) => {
    return (
        <div className="checkout-storage flex-auto ">
            <div className="checkout-content p-2 rounded-left-3 color-shadow-extra-large">
                <h2 className="text-center">
                    Итого: {price}
                </h2>
                <DateField/>
                <div className="d-flex flex-justify-end border-top pt-2">
                    <button className="btn btn-primary">Оплатить</button>
                </div>
            </div>
        </div>
    );
};

export default StorageCheckOut;

StorageCheckOut.propTypes = {
    price: PropTypes.string
};
