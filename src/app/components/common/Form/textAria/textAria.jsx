import React from "react";
import PropTypes from "prop-types";

const TextAria = ({ label, name, value = "", onChange, placeHolder }) => {
    const handleChange = ({ target }) => {
        onChange({ [target.name]: target.value });
    };
    return (
        <div className="form-group">
            {label && <div className="form-group-header">
                <label htmlFor={name}>{label}</label>
            </div>}
            <div className="form-group-body">
                <textarea
                    className="textAria border rounded"
                    value={value}
                    id={name}
                    name={name}
                    onChange={handleChange}
                    placeholder={placeHolder}
                >

                </textarea>
            </div>
        </div>
    );
};

export default TextAria;

TextAria.propTypes = {
    cols: PropTypes.number,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeHolder: PropTypes.string
};
