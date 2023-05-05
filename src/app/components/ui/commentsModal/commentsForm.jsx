import React from "react";
import PropTypes from "prop-types";
import RadioGroupField from "../../common/Form/radioGroupField/radioGroupField";
import TextAria from "../../common/Form/textAria/textAria";
import useForm from "../../../hooks/useForm";
import { useAuth } from "../../../hooks/useAuth";
import { useMasters } from "../../../hooks/useMasters";
import { useComents } from "../../../hooks/useComments";

const CommentsForm = ({ masterId, onSubmit }) => {
    const { currentUser } = useAuth();

    const { updateRate } = useMasters();

    const { addComment } = useComents();

    const arr = ["плохо", "не очень", "нормально", "хорошо", "отлично"];

    const { data, handleChange, setInitial } = useForm({ com: "", rate: "" });
    const handleSubmit = () => {
        const send = {
            ...data,
            rate: arr.findIndex((el) => el === data.rate) + 1,
            name: currentUser.name
        };
        addComment(masterId, send);
        updateRate(send.rate, masterId);
        setInitial();
        if (onSubmit) {
            onSubmit();
        }
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
        <div className="d-flex flex-justify-end mt-3">
            <button
                disabled={data.com === "" || data.rate === ""}
                onClick={handleSubmit}
                className="btn btn-primary">Отправить</button>
        </div></>);
};

export default CommentsForm;

CommentsForm.propTypes = {
    masterId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func
};
