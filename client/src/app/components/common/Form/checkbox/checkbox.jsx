import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ note, label, onChange, value, name }) => {
    return (
        <div className="d-flex">
            <label className="h3 mr-2">{label}</label>
            <div className="pt-1">
                <input type="checkbox" onChange={() => { onChange({ [name]: !value }); }} checked={value} aria-describedby="help-text-for-checkbox" />
            </div>
            <p className="note" id="help-text-for-checkbox">
                {note}
            </p>
        </div>
    );
};

Checkbox.propTypes = {
    note: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.bool
};

export default Checkbox;
