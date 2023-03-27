import RegisterForm from "../components/ui/tatooForms/registerForm";
import React, { useState } from "react";
import LoginForm from "../components/ui/tatooForms/loginForm";
import PropTypes from "prop-types";

const LogRegLayout = ({ onRegSubmit }) => {
    const [status, setStatus] = useState("reg");
    const handleClick = (status) => {
        setStatus(status);
    };
    return (
        status === "reg"
            ? <div className=" d-flex flex-column">
                <RegisterForm onSubmit={onRegSubmit}/>
                <p>Если у вас уже есть аккаунт нажмите <a className="Link" onClick={() => handleClick("log")}>Войти</a></p>
            </div>
            : <div className=" d-flex flex-column">
                <LoginForm/>
                <p>Если у вас нет аккаунта нажмите <a className="Link" onClick={() => handleClick("reg")}>Зарегистрироваться</a></p>
            </div>
    );
};

LogRegLayout.propTypes = {
    onRegSubmit: PropTypes.func
};

export default LogRegLayout;
