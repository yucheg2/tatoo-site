import React from "react";
import PropTypes from "prop-types";
import StorageItem from "./storageItem";
import StorageCheckOut from "./storageCheckOut";
import "./index.css";
import getTatooPrice from "../../../utils/getTatooPrice";
import { useDispatch, useSelector } from "react-redux";
import { getMastersListSelectors, getWaitingStatusSelector, takeOrder } from "../../../store/masters";

const StorageList = ({ arr, handleDelete }) => {
    const dispatch = useDispatch();

    const waiting = useSelector(getWaitingStatusSelector());
    const masters = useSelector(getMastersListSelectors());

    const price = arr.reduce((acc, t) => {
        acc += getTatooPrice(t);
        return acc;
    }, 0) + " руб.";

    const handleSubmit = async(data) => {
        dispatch(takeOrder({ tatoos: arr, orderData: data }))
            .unwrap();
    };
    return (
        <div className="d-flex">
            <div className="d-flex flex-column">
                {arr.map((tatoo) => {
                    return <StorageItem onDelete={handleDelete} key={tatoo._id} {...tatoo}/>;
                })}
            </div>
            <StorageCheckOut waiting={waiting} onSubmit={handleSubmit} masters={masters} price={price}/>
        </div>
    );
};

export default StorageList;

StorageList.propTypes = {
    handleDelete: PropTypes.func,
    arr: PropTypes.array
};
