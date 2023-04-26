import React from "react";
import PropTypes from "prop-types";
import DateField from "../../common/Form/dateField/dateField";
import { useMasters } from "../../../hooks/useMasters";
import SelectField from "../../common/Form/selectField/selectField";
import useForm from "../../../hooks/useForm";

const StorageCheckOut = ({ price }) => {
    const { data, handleChange } = useForm({ master: "", date: "" });
    const { masters } = useMasters();
    const mastersArr = Object.values(masters);
    console.log(data);

    const isDisabled = data.master === "" || data.date === "";
    return (
        <div className="checkout-storage flex-auto ">
            <div className="checkout-content p-2 rounded-left-3 color-shadow-extra-large">
                <SelectField
                    label={"Выберите мастера"}
                    arr={mastersArr}
                    value={data.master}
                    onChange={handleChange}
                    defaultOption="мастера"
                    name="master"
                />
                <DateField name="date" onChange={handleChange} value={data.date} label="Выберите дату"/>
                <h3 className="text-right mt-2">
                    Итого: {price}
                </h3>
                <div className="d-flex flex-justify-end border-top pt-2">
                    <button disabled={isDisabled} className="btn btn-primary">Оплатить</button>
                </div>
            </div>
        </div>
    );
};

export default StorageCheckOut;

StorageCheckOut.propTypes = {
    price: PropTypes.string
};
