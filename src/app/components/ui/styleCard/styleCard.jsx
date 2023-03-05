import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const StyleCard = ({ linkTo, img, name, count }) => {
    return (
        <Link to={linkTo}>
            <div
                className="container p-3"
                style={{
                    backgroundImage: `url( ${img} )`,
                    backgroundSize: "cover",
                    height: "350px"
                }}
            >
                {name && <h2>{name}</h2>}
                {count && <div className="count">
                    <p>{count}</p>
                </div>}
            </div>
        </Link>
    );
};

StyleCard.propTypes = {
    linkTo: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    count: PropTypes.number
};

export default StyleCard;
