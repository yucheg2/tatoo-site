import React from "react";
import PropTypes from "prop-types";
import RadioGroupField from "../../common/Form/radioGroupField/radioGroupField";
import TextAria from "../../common/Form/textAria/textAria";
import useForm from "../../../hooks/useForm";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSelector } from "../../../store/users";
import { updateRate } from "../../../store/masters";
import { addComment } from "../../../store/comments";
import { nanoid } from "@reduxjs/toolkit";

const CommentsForm = ({ masterId, onSubmit, onClose }) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUserSelector());

    const arr = ["плохо", "не очень", "нормально", "хорошо", "отлично"];

    const { data, handleChange, setInitial } = useForm({ com: "", rate: "" });
    const handleSubmit = async() => {
        const send = {
            ...data,
            rate: arr.findIndex((el) => el === data.rate) + 1,
            name: currentUser._id,
            _id: nanoid()
        };
        Promise.all([
            dispatch(addComment({ masterId, send })).unwrap(),
            dispatch(updateRate({ rate: send.rate, masterId })).unwrap()
        ])
            .then(() => {
                setInitial();
                if (onSubmit) {
                    onSubmit();
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    return (<>
        <TextAria
            name="com"
            value={data.com}
            onChange={handleChange}
            placeHolder="Введите отзыв..."
        />
        <p>Оценка работы:</p>
        <RadioGroupField arr={arr} name="rate" onChange={handleChange} value={data.rate}/>
        <div className="d-flex mt-3">
            <div className="flex-auto">
                <button className="btn" onClick={onClose}>назад</button>
            </div>
            <button
                disabled={data.com === "" || data.rate === ""}
                onClick={handleSubmit}
                className="btn btn-primary">Отправить</button>
        </div></>);
};

export default CommentsForm;

CommentsForm.propTypes = {
    onClose: PropTypes.func,
    masterId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func
};
