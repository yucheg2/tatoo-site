import React, { useEffect, useState } from "react";
import LogRegLayout from "../../../../layouts/logRegLayout";
import Modal from "../../../common/modal/modal";
import PropTypes from "prop-types";
import useForm from "../../../../hooks/useForm";
import SelfMadeForm from "./selfMadeForm";
import PhotoFiedl from "../../../common/Form/photoField/photoField";
import { useDispatch, useSelector } from "react-redux";
import { getSizesIsloadingSelector, getSizesSelector } from "../../../../store/sizes";
import { getPlacesIsloadingSelector, getPlacesSelector } from "../../../../store/places";
import { getCurrentUserSelector } from "../../../../store/users";
import { toast } from "react-toastify";
import { incrementNavCount } from "../../../../store/count";
import { createNewTatoo, upload } from "../../../../store/tatoo";

const SelfMadeModal = ({ handleClose, show, styles }) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUserSelector());

    const sizes = useSelector(getSizesSelector());
    const sizesObj = sizes && sizes.reduce((acc, el) => {
        acc[el._id] = el;
        return acc;
    }, {});
    const sizesLoading = useSelector(getSizesIsloadingSelector());

    const places = useSelector(getPlacesSelector());
    const placesLoading = useSelector(getPlacesIsloadingSelector());

    const { data, handleChange, setInitial } = useForm({ src: "", style: "", size: "", place: "" });
    const [status, setStatus] = useState(1);

    useEffect(() => {
        handleChange({ src: "", place: currentUser?.rate ? [] : "" });
    }, [currentUser]);

    const fileSelectedHandler = (fileName) => {
        handleChange({ src: fileName });
    };

    const sizeDescription = sizesObj && sizesObj[data.size]?.size;
    const disabledStatus = Object.values(data).every((d) => d !== "");

    const handlNext = () => {
        setStatus(p => !p);
    };

    const handleSubmit = async() => {
        try {
            if (localStorage.getItem("isMaster")) {
                dispatch(createNewTatoo(sizes, styles, data));
            } else {
                dispatch(upload({ currentUser, styles, sizes, data }))
                    .unwrap()
                    .then(() => {
                        setInitial();
                        dispatch(incrementNavCount());
                        handleClose();
                    });
            }
        } catch (error) {
            toast.error("Ошибка в работе сервера");
        }
    };

    const stylesArr = styles.map(s => ({
        _id: s._id,
        name: s.name
    }));
    const sizesArr = sizes && sizes.map(size => ({
        _id: size._id,
        name: size.name
    }));
    const placesArr = places && places.map(p => p.name);

    return (<Modal onClose={handleClose} show={show} >
        <div className="modal-body-content d-flex">
            {(!sizesLoading && styles && !placesLoading)
                ? status === 1
                    ? <div className="first-page d-flex">
                        <div className="d-flex mr-2">
                            <PhotoFiedl currentUser={currentUser} onChange={fileSelectedHandler} img={data.src}/>
                        </div>
                        <div className="d-flex flex-column">
                            <SelfMadeForm
                                styles={stylesArr}
                                sizes={sizesArr}
                                places={placesArr}
                                sizeDescription={sizeDescription}
                                valueObj={data}
                                handleChange={handleChange}
                            />
                            {currentUser
                                ? <button onClick={handleSubmit} disabled={!disabledStatus} className="btn btn-large btn-primary flex-self-end">
                                    { currentUser.rate ? "Добавить" : "Заказать"}
                                </button>
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
                    </div>
                : <> <span>Loading</span><span className="AnimatedEllipsis"></span></>
            }
        </div>
    </Modal>);
};

export default SelfMadeModal;

SelfMadeModal.propTypes = {
    styles: PropTypes.array,
    handleClose: PropTypes.func,
    show: PropTypes.bool
};
