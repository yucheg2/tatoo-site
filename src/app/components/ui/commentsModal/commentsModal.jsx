import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../../common/modal/modal";
import CommentsList from "./commentsList";
import "./index.css";
import TextAria from "../../common/Form/textAria/textAria";
import useForm from "../../../hooks/useForm";
import RadioGroupField from "../../common/Form/radioGroupField/radioGroupField";
import { useAuth } from "../../../hooks/useAuth";
import { useComents } from "../../../hooks/useComments";
import { useMasters } from "../../../hooks/useMasters";

const CommentsModal = ({ show, onClose, comments, masterId }) => {
    const { currentUser } = useAuth();
    const { updateRate } = useMasters();
    const { addComment } = useComents();
    const { data, handleChange, setInitial } = useForm({ com: "", rate: "" });
    const arr = ["плохо", "не очень", "нормально", "хорошо", "отлично"];
    const handleSubmit = () => {
        const send = {
            ...data,
            rate: arr.findIndex((el) => el === data.rate) + 1,
            name: currentUser.name
        };
        addComment(masterId, send);
        updateRate(send.rate, masterId);
        setInitial();
    };
    useEffect(() => {
        setInitial();
    }, [show]);
    return (
        <Modal show={show} onClose={onClose}>
            { currentUser
                ? show && <><TextAria
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
                </div></>
                : <h2 className="text-center h2 color-fg-subtle mb-0">Отзывы</h2>}
            <CommentsList comments={comments}/>
        </Modal>
    );
};

export default CommentsModal;

CommentsModal.propTypes = {
    masterId: PropTypes.string,
    comments: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
    show: PropTypes.bool,
    onClose: PropTypes.func
};
