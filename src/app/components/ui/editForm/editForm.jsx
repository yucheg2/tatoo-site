import React, { useState, useEffect } from "react";
import useForm from "../../../hooks/useForm";
import { toast } from "react-toastify";
import validator from "../../../utils/validator";
import TextField from "../../common/Form/textField/textField";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";

const EditForm = ({ name, phone }) => {
    const initialData = { name, phone };
    const { data, handleChange } = useForm(initialData);
    const { edit } = useAuth();
    const [error, setError] = useState({});
    const isBlock = Object.keys(error).length > 0 ||
        Object.values(data).some((s) => s === "") ||
        Object.keys(data).every((key) => data[key] === initialData[key]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await edit(data);
            toast.success("Данные изменены!");
        } catch (error) {
            setError(error);
        }
    };

    const validatotConfig = {
        phone: {
            isPhone: {
                message: "Введите номер телефона (+7 (___) ___ __ __)."
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
                </div>
                <button className="btn btn-primary btn-block mb-3 h3 p-2" disabled={isBlock}>
                    Изменить
                </button>
            </form>
        </div>);
};

export default EditForm;

EditForm.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string
};
