import React, { useEffect } from "react";
import PropTypes from "prop-types";

const RadioGroupField = ({ showCircle = true, display = "d-flex", arr, name, onChange, value }) => {
    const handleClick = ({ target }) => {
        if (value.some(el => el === target.value)) {
            onChange({ [name]: value.filter(el => el !== target.value) });
        } else {
            onChange({ [name]: [...value, target.value] });
        }
    };

    const handleChange = ({ target }) => {
        if (typeof value === "string") {
            onChange({
                [name]: target.value
            });
        }
    };
    useEffect(() => {
        arr.length === 1 && onChange({ [name]: arr[0] });
    }, [arr]);

    return (
        <div
            className="radio-group"
        >
            <div className={display + " flex-wrap"}>
                {
                    arr.map((el) => {
                        return (
                            <div key={el} className="mr-2 mb-2">
                                <input
                                    { ...(Array.isArray(value) ? { onClick: handleClick } : {})}
                                    onChange={handleChange}
                                    className="radio-input"
                                    id={el}
                                    type="radio"
                                    value={el}
                                    name={el}
                                    checked= { Array.isArray(value) ? value.some((item) => item === el) : value === el}
                                    style={!showCircle
                                        ? {
                                            display: "none",
                                            appearance: "none",
                                            WebkitAppearance: "none",
                                            MozAppearance: "none"
                                        }
                                        : {}}
                                />
                                <label
                                    className={"radio-label" + (!showCircle ? " px-2" : " ") }
                                    htmlFor={el}
                                >
                                    {el}
                                </label>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

RadioGroupField.propTypes = {
    showCircle: PropTypes.bool,
    display: PropTypes.string,
    arr: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};
export default RadioGroupField;
