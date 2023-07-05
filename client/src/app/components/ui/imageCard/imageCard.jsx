/* eslint-disable no-const-assign */
import React, { useRef } from "react";
import PropTypes from "prop-types";

const ImageCard = ({ onClick, tatoo }) => {
    const imageBlock = useRef();
    const handleHover = () => {
        imageBlock.current.children[0].style.width = "100%";
        imageBlock.current.children[0].children[0].style.opacity = "1";
    };
    const handleOut = () => {
        imageBlock.current.children[0].style.width = "0";
        imageBlock.current.children[0].children[0].style.opacity = "0";
    };
    return (
        <div
            className="container rounded-3 mx-3 my-3"
            onClick={() => { onClick(tatoo); }}
            style={{
                backgroundImage: `url( ${`/${tatoo.src}`} )`,
                backgroundSize: "cover",
                height: "400px",
                cursor: "pointer"
            }}
            ref={imageBlock}
            onMouseOver={handleHover}
            onMouseOut={handleOut}
        >
            <div
                className={"hover f2 rounded-3"}
                style= {{
                    width: "0",
                    height: "100%",
                    background: "rgb(252, 143, 0)",
                    textAlign: "center",
                    transition: "0.4s",
                    paddingTop: "55%"
                }}
            >
                <p
                    className="p color-fg-default text-bold"
                    style={{
                        opacity: "0",
                        transition: "0.30s"
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
