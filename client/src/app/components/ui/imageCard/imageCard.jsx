/* eslint-disable no-const-assign */
import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./index.css";

const ImageCard = ({ onClick, tatoo }) => {
    const imageBlock = useRef();
    const handleHover = () => {
        imageBlock.current.children[1].style.width = "100%";
        imageBlock.current.children[1].children[0].style.opacity = "1";
    };
    const handleOut = () => {
        imageBlock.current.children[1].style.width = "0";
        imageBlock.current.children[1].children[0].style.opacity = "0";
    };
    return (
        <div
            className="cardContainer container rounded-3 mx-3 my-3"
            onClick={() => { onClick(tatoo); }}
            style={{

            }}
            ref={imageBlock}
            onMouseOver={handleHover}
            onMouseOut={handleOut}
        >
            <img className="cardImg rounded-3" src={`/${tatoo.src}`}/>
            <div
                className="cardContent hover f2 rounded-3"
            >
                <p
                    className="p color-fg-default text-bold"
                    style={{

                    }}
                >
                        Смотреть
                </p>
            </div>
        </div>
    );
};

ImageCard.propTypes = {
    onClick: PropTypes.func,
    tatoo: PropTypes.object
};

export default ImageCard;
