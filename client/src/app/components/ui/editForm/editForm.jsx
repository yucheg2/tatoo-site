import React, { useState, useEffect } from "react";
import useForm from "../../../hooks/useForm";
import validator from "../../../utils/validator";
import TextField from "../../common/Form/textField/textField";
import PropTypes from "prop-types";
import LoginForm from "../tatooForms/loginForm";
import { useDispatch, useSelector } from "react-redux";
import { edit, getEditErrorsSelector } from "../../../store/users";

const EditForm = ({ name, phone, email }) => {
    const dispatch = useDispatch();

    const initialData = { name, phone, email };
    const { data, handleChange } = useForm(initialData);
    const submitError = useSelector(getEditErrorsSelector());
    const [error, setError] = useState(submitError);
    const isBlock = Object.keys(error).length > 0 ||
        Object.values(data).some((s) => s === "") ||
        Object.keys(data).every((key) => data[key] === initialData[key]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(edit(data, email !== data.email));
    };

    const handleLogin = () => {
        setError({});
    };

    const validatotConfig = {
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
        submitError.password === undefined
            ? <div className="register-form" >
                <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ height: "100%" }}>
                    <h1 className="text-center">Редактирование</h1>
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
                            label="Электронная почта"
                            placeHolder="Введите вашу почту"
                            type="email"
                            error={error.email}
                        />
                    </div>
                    <button className="btn btn-primary btn-block mb-3 h3 p-2" disabled={isBlock}>
                    Изменить
                    </button>
                </form>
            </div>
            : <LoginForm onSubmit={handleLogin} initialState={{ email, password: "" }} errors={submitError}/>);
};

export default EditForm;

EditForm.propTypes = {
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string
};
