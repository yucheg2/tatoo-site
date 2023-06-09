import React, { useState } from "react";
import LogRegLayout from "../../../../layouts/logRegLayout";
import Modal from "../../../common/modal/modal";
import PropTypes from "prop-types";
import { useAuth } from "../../../../hooks/useAuth";
import useForm from "../../../../hooks/useForm";
import SelfMadeForm from "./selfMadeForm"; import { useSizes } from "../../../../hooks/useSizes";
import { usePlaces } from "../../../../hooks/usePlaces";
import PhotoFiedl from "../../../common/Form/photoField/photoField";
import { toast } from "react-toastify";

const SelfMadeModal = ({ handleClose, show, styles }) => {
    const { currentUser } = useAuth();
    const { sizes } = useSizes();
    const { places } = usePlaces();
    const { data, handleChange } = useForm({ img: "", style: "", size: "", place: "" });
    const [status, setStatus] = useState(1);

    const sizeDescription = sizes && sizes[data.size]?.size;
    const disabledStatus = Object.values(data).every((d) => d !== "");

    const handlNext = () => {
        setStatus(p => !p);
    };
    const fileSelectedHandler = ({ target }) => {
        const { type, name } = target.files[0];

        if (type.includes("image")) {
            handleChange({ img: name });
        } else {
            toast.error("Вставте фотографию");
        }
    };

    console.log(data);
    const stylesArr = Object.keys(styles).map(s => ({
        _id: s,
        name: styles[s].name
    }));
    const sizesArr = sizes && Object.keys(sizes).map(size => ({
        _id: size,
        name: sizes[size].name
    }));
    const placesArr = places && Object.values(places);

    // console.log(data, placesArr);

    return (<Modal onClose={handleClose} show={show} >
        <div className="modal-body-content d-flex">
            {(sizes && styles && places)
                ? status === 1
                    ? <div className="first-page d-flex">
                        <div>
                            <PhotoFiedl onChange={fileSelectedHandler}/>
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
    styles: PropTypes.object,
    handleClose: PropTypes.func,
    show: PropTypes.bool
};
