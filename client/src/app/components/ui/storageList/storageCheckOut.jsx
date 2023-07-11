import React from "react";
import PropTypes from "prop-types";
import DateField from "../../common/Form/dateField/dateField";
import SelectField from "../../common/Form/selectField/selectField";
import useForm from "../../../hooks/useForm";

const StorageCheckOut = ({ waiting, price, onSubmit, masters }) => {
    const { data, handleChange } = useForm({ master: "", date: "" });
    const mastersArr = Object.values(masters);

    const handleSubmit = () => {
        onSubmit(data);
    };

    const isDisabled = data.master === "" || data.date === "";
    return (
        <div className="checkout-storage flex-auto ">
            <div className="checkout-content p-2 rounded-left-3 color-shadow-extra-large">
                <SelectField
                    label="Выберите мастера"
                    arr={mastersArr}
                    value={data.master}
                    onChange={handleChange}
                    defaultOption="мастера"
                    name="master"
                />
                <DateField name="date" onChange={handleChange} value={data.date} label="Выберите дату"/>
                <h4 className="text-right mt-2">
                    Примерная стоимость: {price}
                </h4>
                <div className="d-flex flex-justify-end border-top pt-2">
                    { waiting
                        ? <button className="btn btn-primary">
                            <span>Ожидаем</span><span className="AnimatedEllipsis"></span>
                        </button>
                        : <button className="btn btn-primary" disabled={isDisabled} onClick={handleSubmit}>
                            Записаться
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default StorageCheckOut;

StorageCheckOut.propTypes = {
    waiting: PropTypes.bool,
    masters: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSubmit: PropTypes.func,
    price: PropTypes.string
};
