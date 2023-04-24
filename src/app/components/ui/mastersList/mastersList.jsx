import React from "react";
import PropTypes from "prop-types";
import MasterItem from "./masterItem";
import "./index.css";

const MastersList = ({ obj }) => {
    const mastersArr = Object.values(obj);
    console.log(mastersArr);
    return (
        <div className="clearfix">
            {mastersArr.map((master) => {
                return <MasterItem key={master._id} {...master}/>;
            })}
        </div>
    );
};

export default MastersList;

MastersList.propTypes = {
    obj: PropTypes.object
};
