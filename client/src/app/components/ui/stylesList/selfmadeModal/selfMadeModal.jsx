import React, { useState } from "react";
import LogRegLayout from "../../../../layouts/logRegLayout";
import Modal from "../../../common/modal/modal";
import PropTypes from "prop-types";
import useForm from "../../../../hooks/useForm";
import SelfMadeForm from "./selfMadeForm";
import PhotoFiedl from "../../../common/Form/photoField/photoField";
import { useSelector } from "react-redux";
import { getSizesIsloadingSelector, getSizesSelector } from "../../../../store/sizes";
import { getPlacesIsloadingSelector, getPlacesSelector } from "../../../../store/places";
import { getCurrentUserSelector } from "../../../../store/users";

const SelfMadeModal = ({ handleClose, show, styles }) => {
    const currentUser = useSelector(getCurrentUserSelector());

    const sizes = useSelector(getSizesSelector());
    const sizesObj = sizes.reduce((acc, el) => {
        acc[el._id] = el;
        return acc;
    }, {});
    const sizesLoading = useSelector(getSizesIsloadingSelector());

    const places = useSelector(getPlacesSelector());
    const placesLoading = useSelector(getPlacesIsloadingSelector());

    const { data, handleChange } = useForm({ img: "", style: "", size: "", place: "" });
    const [status, setStatus] = useState(1);

    const fileSelectedHandler = (fileName) => {
        handleChange({ img: fileName });
    };

    const sizeDescription = sizesObj && sizesObj[data.size]?.size;
    const disabledStatus = Object.values(data).every((d) => d !== "");

    const handlNext = () => {
        setStatus(p => !p);
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
                            <PhotoFiedl onChange={fileSelectedHandler} img={data.img}/>
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
                                ? <button disabled={!disabledStatus} className="btn btn-large btn-primary flex-self-end">Заказать</button>
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
