import React from "react";
import PropTypes from "prop-types";

const DateField = ({ label, name, value, onChange }) => {
    const getMin = () => {
        const date = new Date();
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    const handleChange = ({ target }) => {
        onChange({ [target.name]: target.value });
    };
    return (
        <div className="d-flex">
            <label htmlFor="date" className="h2 mr-2">{label}</label>
            <input type="date" onChange={handleChange} value={value} className="border rounded" name={name} min={getMin()}/>
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
