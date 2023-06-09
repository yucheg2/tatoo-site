import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ labelClass = "h3", arr, label, value, onChange, name, defaultOption }) => {
    const handleChange = ({ target }) => {
        onChange({ [target.name]: target.value });
    };
    return (
        <div className="form-group d-flex flex-justify-between">
            <div className="form-group-header">
                <label htmlFor="masters-select" className={labelClass + " mr-2"}>{label}</label>
            </div>
            <div className="form-group-body flex-self-end">
                <select
                    className="form-select"
                    id="masters-select"
                    value={value}
                    name={name}
                    onChange={handleChange}
                >
                    <option disabled value="">{defaultOption}</option>
                    {arr.map((m) => {
                        return <option value={m._id} key={m._id}>{m.name}</option>;
                    })}
                </select>
            </div>
        </div>
    );
};

export default SelectField;

SelectField.propTypes = {
    labelClass: PropTypes.string,
    defaultOption: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    arr: PropTypes.array
};
