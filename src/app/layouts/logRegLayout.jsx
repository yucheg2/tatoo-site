import RegisterForm from "../components/ui/tatooForms/registerForm";
import React, { useState } from "react";
import LoginForm from "../components/ui/tatooForms/loginForm";
import PropTypes from "prop-types";

const LogRegLayout = ({ init = "reg", onSubmit }) => {
    const [status, setStatus] = useState(init);
    const handleClick = (status) => {
        setStatus(status);
    };
    return (
        status === "reg"
            ? <div className=" d-flex flex-column">
                <RegisterForm onSubmit={onSubmit}/>
                <p>Если у вас уже есть аккаунт нажмите <a className="Link" onClick={() => handleClick("log")}>Войти</a></p>
            </div>
            : <div className=" d-flex flex-column">
                <LoginForm onSubmit={onSubmit}/>
                <p>Если у вас нет аккаунта нажмите <a className="Link" onClick={() => handleClick("reg")}>Зарегистрироваться</a></p>
            </div>
    );
};

LogRegLayout.propTypes = {
    onSubmit: PropTypes.func,
    init: PropTypes.string
};

export default LogRegLayout;
