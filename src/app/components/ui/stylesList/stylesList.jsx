import React from "react";
import PropTypes from "prop-types";
import PageCard from "../../common/PageCard";

const StylesList = ({ styles, tatoos }) => {
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
                    <PageCard
                        linkTo={`/styles/${style.name}`}
                        img={getImgUrl(tatoos, style.name)}
                        name={style.name}
                        count={getCount(style.name)}
                    />
                </div>
            ))}
        </div>
    );
};

StylesList.propTypes = {
    styles: PropTypes.object,
    tatoos: PropTypes.array
};

export default StylesList;
