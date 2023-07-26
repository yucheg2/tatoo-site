import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const DateField = ({ label, name, value, onChange }) => {
    const date = new Date();
    const getMin = () => {
        const day = date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : date.getDate() + 1;
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    const getMax = () => {
        const day = date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : date.getDate() + 1;
        const month = date.getMonth() + 2 < 10 ? `0${date.getMonth() + 2}` : date.getMonth() + 2;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    const handleChange = ({ target }) => {
        onChange({ [target.name]: target.value });
    };
    return (
        <div className="d-flex">
            <label htmlFor="date" className="h3 mr-2 flex-auto">{label}</label>
            <input type="date" onChange={handleChange} value={value} className="border rounded" name={name} min={getMin()} max={getMax()}/>
        </div>
    );
};

export default DateField;

DateField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string
};
