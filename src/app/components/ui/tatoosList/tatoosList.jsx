import React from "react";
import PropTypes from "prop-types";
import PageCard from "../../common/PageCard";

const TatoosList = ({ array }) => {
    const handleClick = (e) => {
        e.preventDefault();
        console.log("joj");
    };
    return (
        array.map((t, i) => {
            return <div
                key={i}
                className="col-4 float-left"
            >
                <PageCard
                    onClick={handleClick}
                    img={`/${t.src}`}
                />
            </div>;
        })
    );
};

TatoosList.propTypes = {
    styles: PropTypes.object,
    tatoos: PropTypes.array
};

export default TatoosList;
