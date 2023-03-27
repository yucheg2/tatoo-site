import React, { useState } from "react";
import "./index.css";
import PropTypes from "prop-types";
import TatooForm1 from "../tatooForms/tatooForm";
import Modal from "../../common/modal/modal";
import LogRegLayout from "../../../layouts/logRegLayout";

const TatoosModal = ({ tatoo, onClose, show }) => {
    const [data, setData] = useState("");
    const [status, setStatus] = useState(1);

    const handleClose = () => {
        onClose();
        setData("");
        setStatus(1);
    };
    const handlNext = () => {
        setStatus(2);
    };

    const handleChoose = (data) => {
        setData(data);
    };
    const handleSubmit = () => {
        const obj = { _id: tatoo.src, places: data };
        const store = localStorage.getItem("store");
        if (store) {
            const newArr = JSON.parse(store);
            localStorage.setItem("store", JSON.stringify([...newArr, obj]));
        } else {
            localStorage.setItem("store", JSON.stringify([obj]));
        }
    };
    const isAuth = localStorage.getItem("auth");
    return (
        <Modal onClose={handleClose} show={show} >
            <div className="modal-body-content d-flex">
                {
                    status === 1
                        ? <div className="first-page d-flex">
                            <img src={`/${tatoo.src}`} alt="" className="img mr-4 color-shadow-large"/>
                            <div className="d-flex flex-column">
                                <TatooForm1 tatoo={tatoo} onChange={handleChoose} value={data}/>
                                {isAuth
                                    ? <button disabled={data === ""} onClick={handleSubmit} className="btn btn-large btn-primary flex-self-end">Заказать</button>
                                    : (
                                        <div className="flex-self-end">
                                            <button onClick={handlNext} className="btn btn-large btn-primary ">Далее</button>
                                            <p className="m-0 text-italic">Чтобы заказать татуировку, нужно быть зарегистрированным.</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        : <div className="second-page d-flex">
                            <LogRegLayout onRegSubmit={() => { setStatus(1); }}/>
                        </div>}
            </div>
        </Modal>
    );
};

TatoosModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    tatoo: PropTypes.object
};
export default TatoosModal;
