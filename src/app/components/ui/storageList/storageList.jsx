import React from "react";
import PropTypes from "prop-types";
import StorageItem from "./storageItem";
import StorageCheckOut from "./storageCheckOut";
import "./index.css";
import getTatooPrice from "../../../utils/getTatooPrice";

const StorageList = ({ arr, handleDelete }) => {
    const price = arr.reduce((acc, t) => {
        acc += getTatooPrice(t);
        return acc;
    }, 0) + " руб.";
    return (
        <div className="d-flex">
            <div className="d-flex flex-column">
                {arr.map((tatoo) => {
                    return <StorageItem onDelete={handleDelete} key={tatoo._id} {...tatoo}/>;
                })}
            </div>
            <StorageCheckOut price={price}/>
        </div>
    );
};

export default StorageList;

StorageList.propTypes = {
    handleDelete: PropTypes.func,
    arr: PropTypes.array
};
