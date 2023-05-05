import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";

const StyleCard = ({ linkTo, img, name, count }) => {
    return (
        <div className="styleContainer">
            <Link
                className="styleLink"
                to={linkTo}
                style={{ textDecoration: "none" }}>
                <div style={{
                    position: "relative",
                    width: "100%",
                    overflow: "hidden"
                }}>
                    <div
                        className="styleImg container "
                        style= {{ backgroundImage: `url(${img})` }}
                        alt="style"
                    >
                    </div>
                    <div className="styleTxt p-3 ">
                        {name && <h2 className="color-fg-on-emphasis">{name}</h2>}
                        {count && <p className="color-fg-on-emphasis">{count}</p>}
                    </div>
                </div>
            </Link>
        </div>
    );
};

StyleCard.propTypes = {
    linkTo: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    count: PropTypes.number
};

export default StyleCard;
