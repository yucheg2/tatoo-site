import React from "react";
import PropTypes from "prop-types";
import MasterItem from "./masterItem";
import "./index.css";
import config from "../../../config.json";

const MastersList = ({ obj }) => {
    const mastersArr = config.isFireBase ? Object.values(obj) : obj;
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
    obj: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
