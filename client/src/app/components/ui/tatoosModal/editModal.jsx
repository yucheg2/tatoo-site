import React from "react";
import PropTypes from "prop-types";
import PhotoFiedl from "../../common/Form/photoField/photoField";
import { useDispatch, useSelector } from "react-redux";
import { getSizesSelector } from "../../../store/sizes";
import { getPlacesSelector } from "../../../store/places";
import { getCurrentUserSelector } from "../../../store/users";
import { toast } from "react-toastify";
import { getStylesSelector } from "../../../store/styles";
import SelfMadeForm from "../stylesList/selfmadeModal/selfMadeForm";
import useForm from "../../../hooks/useForm";
import Modal from "../../common/modal/modal";
import { ReactComponent as TrashIcon } from "../../../../icons/trashIcon.svg";
import { deleteTatoo, editTatoo, getEditLoadingSelector } from "../../../store/tatoo";

const EditModal = ({ onClose, show, src, style, place, size, _id }) => {
    const dispatch = useDispatch();

    const editWaiting = useSelector(getEditLoadingSelector());

    const currentUser = useSelector(getCurrentUserSelector());

    const sizes = useSelector(getSizesSelector());
    const sizesObj = sizes && sizes.reduce((acc, el) => {
        acc[el._id] = el;
        return acc;
    }, {});
    const sizeId = sizes.find((s) => s.name === size.name)._id;

    const styles = useSelector(getStylesSelector());
    const styleId = styles.find((s) => s.name === style)._id;

    const places = useSelector(getPlacesSelector());

    const initialData = { src, style: styleId, size: sizeId, place };
    const { data, handleChange, setInitial } = useForm({ src, style: styleId, size: sizeId, place });

    const fileSelectedHandler = (fileName) => {
        handleChange({ src: fileName });
    };

    const sizeDescription = sizesObj && sizesObj[data.size]?.size;
    const disabledStatus = Object.values(data).some((s) => s === "") ||
    Object.keys(data).every((key) => {
        return data[key] === initialData[key] ||
        (place.length === data[key].length && place.every((s) => data[key].includes(s)));
    }) || editWaiting;

    const handleClose = () => {
        setInitial();
        onClose();
    };

    const handleSubmit = async() => {
        try {
            dispatch(editTatoo(sizes, styles, data, _id, src !== data.src));
        } catch (error) {
            toast.error("Ошибка в работе сервера");
        }
    };

    const handleDelete = () => {
        dispatch(deleteTatoo({ _id, src }));
    };

    const stylesArr = styles.map(s => ({
        _id: s._id,
        name: s.name
    }));
    const sizesArr = sizes && sizes.map(s => ({
        _id: s._id,
        name: s.name
    }));
    const placesArr = places && places.map(p => p.name);

    return (<Modal onClose={handleClose} show={show} >
        <div className="modal-body-content d-flex">
            <div className="first-page d-flex">
                <div className="d-flex mr-2">
                    <PhotoFiedl currentUser={currentUser} onChange={fileSelectedHandler} img={data.src}/>
                </div>
                <div className="d-flex flex-column">
                    <button onClick={handleDelete} className="btn btn-danger flex-self-end">
                        <TrashIcon size={16}/>
                    </button>
                    <SelfMadeForm
                        styles={stylesArr}
                        sizes={sizesArr}
                        places={placesArr}
                        sizeDescription={sizeDescription}
                        valueObj={data}
                        handleChange={handleChange}
                    />
                    <button onClick={handleSubmit} disabled={disabledStatus} className="btn btn-large btn-primary flex-self-end">
                        { !(editWaiting)
                            ? "Изменить"
                            : <><span>Ожидаем</span><span className="AnimatedEllipsis"></span></>}
                    </button>
                </div>
            </div>

        </div>
    </Modal>);
};

export default EditModal;

EditModal.propTypes = {
    _id: PropTypes.string,
    src: PropTypes.string,
    style: PropTypes.string,
    place: PropTypes.array,
    size: PropTypes.object,
    onClose: PropTypes.func,
    show: PropTypes.bool
};
