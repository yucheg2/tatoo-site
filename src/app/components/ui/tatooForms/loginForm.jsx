import React from "react";
import useForm from "../../../hooks/useForm";
import TextField from "../../common/Form/textField/textField";

const LoginForm = () => {
    const { data, handleChange } = useForm({ password: "", email: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
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
                    />
                    <TextField
                        value={data.password}
                        name="password"
                        onChange={handleChange}
                        label="Пароль"
                        placeHolder="Введите ваш пароль"
                        type="password"
                    />
                </div>
                <button className="btn btn-primary btn-block mb-3 h3 p-2">
                    Войти
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
