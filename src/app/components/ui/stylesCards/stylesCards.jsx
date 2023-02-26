import React from "react";
import StyleCard from "../styleCard/styleCard";
import PropTypes from "prop-types";

const StylesCards = ({ styles, tatoos }) => {
    const getImgUrl = (arr, style) => {
        return arr.find((tatto) => tatto.style === style).src;
    };
    const getCount = (style) => {
        return tatoos.filter((tatoo) => tatoo.style === style).length;
    };
    return (
        <div className="container-lg clearfix">
            {Object.values(styles).map((style) => (
                <div
                    key={style.name}
                    className="col-4 float-left"
                >
                    <StyleCard
                        img={getImgUrl(tatoos, style.name)}
                        name={style.name}
                        count={getCount(style.name)}
                    />
                </div>
            ))}
        </div>
    );
};

StylesCards.propTypes = {
    styles: PropTypes.object,
    tatoos: PropTypes.array
};

export default StylesCards;
