import React, { useState, useEffect } from "react";
import useForm from "../../../hooks/useForm";
import validator from "../../../utils/validator";
import TextField from "../../common/Form/textField/textField";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getStylesSelector } from "../../../store/styles";
import RadioGroupField from "../../common/Form/radioGroupField/radioGroupField";
import TextAria from "../../common/Form/textAria/textAria";
import { editMaster } from "../../../store/masters";

const MasterEditForm = ({ name, email, favStyles, description }) => {
    const dispatch = useDispatch();

    const styles = useSelector(getStylesSelector());
    const stylesArr = styles && Object.values(styles).map(s => s.name);

    const faveStyleArr = favStyles && Object.values(favStyles);
    const initialData = { name, email, style: faveStyleArr, desc: description };
    const { data, handleChange } = useForm(initialData);
    const [error, setError] = useState({});
    const isBlock = Object.keys(error).length > 0 ||
        Object.values(data).some((s) => s === "") ||
        Object.keys(data).every((key) => data[key] === initialData[key]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const sendData = {
            ...data,
            description: data.desc,
            favStyles: data.style.reduce((acc, s) => {
                const styleObj = styles.find(st => st.name === s);
                acc[styleObj.key] = s;
                return acc;
            }, {})
        };
        dispatch(editMaster(sendData));
    };

    const validatotConfig = {
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
    return (<div className="register-form" >
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
                    value={data.email}
                    name="email"
                    onChange={handleChange}
                    label="Электронная почта"
                    placeHolder="Введите вашу почту"
                    type="email"
                    error={error.email}
                />
                <p className="h3">Любимые стили</p>
                <RadioGroupField
                    name="style"
                    arr={stylesArr}
                    onChange={handleChange}
                    value={data.style}
                />
                <TextAria
                    name="desc"
                    value={data.desc}
                    onChange={handleChange}
                    placeHolder="Описание"
                />
            </div>
            <button className="btn btn-primary btn-block mb-3 h3 p-2" disabled={isBlock}>
                    Изменить
            </button>
        </form>
    </div>);
};

export default MasterEditForm;

MasterEditForm.propTypes = {
    description: PropTypes.string,
    favStyles: PropTypes.object,
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string
};
