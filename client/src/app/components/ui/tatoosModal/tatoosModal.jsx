import React, { useState } from "react";
import "./index.css";
import PropTypes from "prop-types";
import TatooForm1 from "../tatooForms/tatooForm";
import Modal from "../../common/modal/modal";
import LogRegLayout from "../../../layouts/logRegLayout";
import { useDispatch, useSelector } from "react-redux";
import { incrementNavCount } from "../../../store/count";
import { getCurrentUserSelector } from "../../../store/users";
import { localStorageService } from "../../../services/localstorage.service";

const TatoosModal = ({ tatoo, onClose, show }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState("");
    const [status, setStatus] = useState(1);
    const currentUser = useSelector(getCurrentUserSelector());

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
        const obj = { _id: tatoo.src + data + Date.now(), place: data, src: tatoo.src };
        const store = localStorageService.getStore();
        if (store) {
            const newArr = JSON.parse(store);
            if (!newArr.some((item) => (item.places === obj.place && obj.src === item.src))) {
                localStorageService.setStore(JSON.stringify([...newArr, obj]));
            }
        } else {
            localStorageService.setStore(JSON.stringify([obj]));
        }
        handleClose();
        dispatch(incrementNavCount());
    };
    return (
        <Modal onClose={handleClose} show={show} >
            <div className="modal-body-content d-flex">
                {
                    status === 1
                        ? <div className="first-page d-flex">
                            <img src={`/${tatoo.src}`} alt="" className="img-modal mr-4 color-shadow-large"/>
                            <div className="d-flex flex-column">
                                <TatooForm1 tatoo={tatoo} onChange={handleChoose} value={data}/>
                                {currentUser
                                    ? (!currentUser.rate && <button disabled={data === ""} onClick={handleSubmit} className="btn btn-large btn-primary flex-self-end">Заказать</button>)
                                    : (
                                        <div className="d-flex flex-column flex-self-end">
                                            <button onClick={handlNext} className="btn btn-large btn-primary flex-self-end">Далее</button>
                                            <p className="m-0 text-italic">Чтобы заказать татуировку, нужно быть зарегистрированным.</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        : <div className="second-page d-flex">
                            <LogRegLayout onSubmit={() => { setStatus(1); }}/>
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
