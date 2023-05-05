import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import TextField from "../../common/Form/textField/textField";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const LoginForm = ({ onSubmit, initialState = { password: "", email: "" }, errors = {} }) => {
    const { data, handleChange } = useForm(initialState);
    const isBlock = Object.values(data).some(s => s === "");
    const { signIn } = useAuth();
    const [error, setError] = useState(errors);
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await signIn(data);
            onSubmit && onSubmit();
            setError({});
            toast.success("Вы вошли в аккаунт!");
        } catch (error) {
            setError(error);
        }
    };
    return (
        <div className="login-form" >
            <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ height: "100%" }}>
                <h1 className="text-center">Войти</h1>
                <div className="flex-auto mb-10">
                    <TextField
                        value={data.email}
                        name="email"
                        onChange={handleChange}
                        label="Email"
                        placeHolder="Введите ваш email"
                        error={error.email}
                    />
                    <TextField
                        errOnFirstRender = {true}
                        value={data.password}
                        name="password"
                        onChange={handleChange}
                        label="Пароль"
                        placeHolder="Введите ваш пароль"
                        type="password"
                        error={error.password}
                    />
                </div>
                <button disabled={isBlock} className="btn btn-primary btn-block mb-3 h3 p-2">
                    Войти
                </button>
            </form>
        </div>
    );
};

export default LoginForm;

LoginForm.propTypes = {
    initialState: PropTypes.object,
    errors: PropTypes.object,
    onSubmit: PropTypes.func
};
