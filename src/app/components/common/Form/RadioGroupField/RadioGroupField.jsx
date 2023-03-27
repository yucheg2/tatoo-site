import React, { useEffect } from "react";
import PropTypes from "prop-types";

const RadioGroupField = ({ arr, name, onChange, value }) => {
    const handleChange = ({ target }) => {
        onChange({ [name]: target.value });
    };
    useEffect(() => {
        arr.length === 1 && onChange({ [name]: arr[0] });
    }, [arr]);
    return (
        <div
            className="radio-group"
        >
            <div className="d-flex flex-wrap">
                {arr.length > 1
                    ? arr.map((el) => {
                        return (
                            <div key={el} className="mr-2 mb-2">
                                <input
                                    onChange={handleChange}
                                    className="radio-input"
                                    id={el}
                                    type="radio"
                                    value={el}
                                    name={el}
                                    checked= {value === el}
                                />
                                <label className="radio-label" htmlFor={el}>{el}</label>
                            </div>
                        );
                    })
                    : <p className="border rounded-2 p-2" style={{ userSelect: "none" }}>{arr[0]}</p>
                }
            </div>
        </div>
    );
};

RadioGroupField.propTypes = {
    arr: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};
export default RadioGroupField;
