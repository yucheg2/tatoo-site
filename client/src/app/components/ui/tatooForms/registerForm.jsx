import React, { useEffect, useState } from "react";
import TextField from "../../common/Form/textField/textField";
import validator from "../../../utils/validator";
import PropTypes from "prop-types";
import useForm from "../../../hooks/useForm";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUp } from "../../../store/users";

const RegisterForm = ({ onSubmit }) => {
    const dispatch = useDispatch();

    const initialData = { name: "", password: "", phone: "", email: "" };
    const { data, handleChange, setInitial } = useForm(initialData);
    const [error, setError] = useState({});
    const isBlock = Object.keys(error).length > 0 || Object.values(data).some((s) => s === "");
    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(signUp(data))
            .unwrap()
            .then(() => {
                setInitial(initialData);
                onSubmit && onSubmit();
                toast.success("Вы зарегистрированы!");
            })
            .catch((error) => {
                setError(error);
            });
    };

    const validatotConfig = {
        password: {
            min: {
                message: "Пароль должен содержать минимум 8 символов.",
                value: 8
            },
            isCapital: {
                message: "Пароль должен содержать хотя бы одну заглавную букву."
            },
            isDigit: {
                message: "Пароль должен содержать хотя бы одну цифру."
            }
        },
        phone: {
            isPhone: {
                message: "Введите номер телефона (+7 (___) ___ __ __)."
            }
        },
        email: {
            isEmail: {
                message: "Email введен не коректно."
            }
        }
    };
    function validate() {
        const error = validator(data, validatotConfig);
        setError(error);
        return Object.keys(error).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);
    return (
        <div className="register-form" >
            <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ height: "100%" }}>
                <h1 className="text-center">Регистрация</h1>
                <div className="flex-auto mb-10">
                    <TextField
                        value={data.name}
                        name="name"
                        onChange={handleChange}
                        label="Имя"
                        placeHolder="Введите имя"
                        error={error.name}
                    />
                    <TextField
                        value={data.phone}
                        name="phone"
                        onChange={handleChange}
                        label="Номерт телефона"
                        placeHolder="Введите ваш номер"
                        type="tell"
                        error={error.phone}
                    />
                    <TextField
                        value={data.email}
                        name="email"
                        onChange={handleChange}
                        label="Email"
                        placeHolder="Введите email"
                        error={error.email}
                    />
                    <TextField
                        value={data.password}
                        name="password"
                        onChange={handleChange}
                        label="Пароль"
                        placeHolder="Введите пароль от 8 символов"
                        type="password"
                        error={error.password}
                    />
                </div>
                <button className="btn btn-primary btn-block mb-3 h3 p-2" disabled={isBlock}>
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;

RegisterForm.propTypes = {
    onSubmit: PropTypes.func
};
