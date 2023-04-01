import React from "react";
import PropTypes from "prop-types";
import StorageItem from "./storageItem";

const StorageList = ({ arr, handleDelete }) => {
    return (<div className="d-flex flex-column">
        {arr.map((tatoo) => {
            return <StorageItem onDelete={handleDelete} key={tatoo.id} {...tatoo}/>;
        })}
    </div>);
};

export default StorageList;

StorageList.propTypes = {
    handleDelete: PropTypes.func,
    arr: PropTypes.array
};
