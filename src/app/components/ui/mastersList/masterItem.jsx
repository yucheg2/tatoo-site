import React from "react";
import PropTypes from "prop-types";

const MasterItem = ({ name, img, rate, description, ...rest }) => {
    return (
        <div className="col-9 mx-auto d-flex">
            <img className="avatar mt-2 mr-3" src={img} alt="" />
            <div>
                <div className="d-flex">
                    <p className="h3 flex-auto">{name}</p>
                    <p className="text-semibold"> Рейтинг: {rate}/5</p>
                </div>
                <p>{description}</p>
                <a className="link">Отзывы</a>
            </div>
        </div>
    );
};

export default MasterItem;

MasterItem.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
    rate: PropTypes.number,
    description: PropTypes.string
};
