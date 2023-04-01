import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import getTatooPrice from "../../../utils/getTatooPrice";
import { ReactComponent as TrashIcon } from "../../../../icons/trashIcon.svg";

const StorageItem = ({ id, src, place, size, style, onDelete }) => {
    return (
        <div className="container-srorage rounded-3 d-flex p-2 mb-2 mx-3">
            <img className="img-storage rounded-3 mr-2"src={src} alt="Ошибка :(" />
            <div className="item-info d-flex flex-column">
                <div className="d-flex flex-column flex-auto">
                    <div className="storage-place border-bottom pt-3">
                        <p className="h2 m-0">Место нанесения: {place}</p>
                    </div>
                    <div className="storage-size pt-3 border-bottom ">
                        <p className="h2 m-0">Размер: {size.name}</p>
                        <span className="text-light">{`Примерно ${size.size}`}</span>
                    </div>
                    <div className="storage-style pt-3 border-bottom ">
                        <p className="h2 m-0">Стиль: {style}</p>
                    </div>
                </div>
                <p className="flex-self-end">{getTatooPrice({ size })}</p>
            </div>
            <button onClick={() => { onDelete(id); }} className="btn btn-danger flex-self-start">
                <TrashIcon size={16}/>
            </button>
        </div>
    );
};

export default StorageItem;

StorageItem.propTypes = {
    id: PropTypes.string,
    onDelete: PropTypes.func,
    style: PropTypes.string,
    place: PropTypes.string,
    src: PropTypes.string,
    size: PropTypes.object
};
