import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { Link } from "react-router-dom";

const StyleCard = ({ name, img, count }) => {
    return (
        <Link to={`/styles/${name}`}>
            <div
                className="container border color-border-done-emphasis p-3"
                style={{
                    backgroundImage: `url( ${img} )`,
                    backgroundSize: "cover"
                }}
            >
                <h2>{name}</h2>
                <div className="hover">
                    <p>{count}</p>
                </div>
            </div>
        </Link>
    );
};

StyleCard.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
    count: PropTypes.number
};

export default StyleCard;
