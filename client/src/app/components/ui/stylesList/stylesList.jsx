import React, { useState } from "react";
import PropTypes from "prop-types";
import StyleCard from "../styleCard/styleCard";
import SelfMadeModal from "./selfmadeModal/selfMadeModal";

const StylesList = ({ styles, tatoos }) => {
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => {
        setShowModal((p) => !p);
    };
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
                        linkTo={`/styles/${style.name}`}
                        img={getImgUrl(tatoos, style.name)}
                        name={style.name}
                        count={getCount(style.name)}
                    />
                </div>
            ))}
            <button onClick={handleToggleModal} className="btn btn-block h2 p-4 border-top-0 rouded-top-0">Создать свою</button>
            <SelfMadeModal styles={styles} handleClose={handleToggleModal} show={showModal}/>
        </div>
    );
};

StylesList.propTypes = {
    styles: PropTypes.object,
    tatoos: PropTypes.array
};

export default StylesList;
