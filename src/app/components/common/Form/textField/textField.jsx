import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as EyeOpen } from "../../../../../icons/eyeIcon.svg";
import { ReactComponent as EyeClosedIcon } from "../../../../../icons/eyeCloseIcon.svg";

const TextField = ({ value, name, onChange, label, type, placeHolder, error }) => {
    const [ShowPassword, setShowPassword] = useState(false);
    const renderCount = useRef(0);
    useEffect(() => {
        renderCount.current += 1;
    }, [value]);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    const handleChange = ({ target }) => {
        onChange({ [target.name]: target.value });
    };
    return (
        <div className={"form-group " + (error && renderCount.current > 1 ? "errored" : "")}>
            <div className="form-group-header">
                <label htmlFor={name} className="h3">{label}</label>
            </div>
            <div className={type === "password" ? "input-group" : "form-group-body"}>
                <input
                    name={name}
                    onChange={handleChange}
                    className="form-control input-lg"
                    type={ShowPassword ? "text" : type}
                    value={value || ""}
                    id={name}
                    placeholder={placeHolder}
                    aria-label="Full-width input"
                />
                {type === "password" && (
                    <span className="input-group-button">
                        <button
                            className="btn"
                            onClick={toggleShowPassword}
                            type="button"
                        >
                            {ShowPassword
                                ? <EyeOpen size={16}/>
                                : <EyeClosedIcon size={16}/>}
                        </button>
                    </span>
                )
                }
            </div>
            {(error && renderCount.current > 1) && <p className="note error" id="username-input-validation">
                {error}
            </p>}
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    error: PropTypes.string,
    placeHolder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string
};

export default TextField;
