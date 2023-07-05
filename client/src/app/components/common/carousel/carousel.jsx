import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Carousel = ({ children, pageNumber }) => {
    return (
        <div className="carousel-main">
            <div className="carousel-window">
                <div
                    className="carousel-items d-flex"
                    style={{
                        transform: `translateX(-${(pageNumber - 1) * 300}px)`
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Carousel;

Carousel.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    pageNumber: PropTypes.number.isRequired
};
