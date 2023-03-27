import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageCard from "../imageCard/imageCard";
import TatoosModal from "../tatoosModal/tatoosModal";

const TatoosList = ({ array }) => {
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState();
    const handleChoose = (t) => {
        setShowModal(true);
        setSelected(t);
    };
    const handleClose = () => {
        setShowModal(false);
    };
    return (
        <>
            {array.map((t, i) => {
                return <div
                    key={i}
                    className="col-4 float-left"
                >
                    <ImageCard
                        onClick={handleChoose}
                        tatoo={t}
                    />
                </div>;
            })}
            {selected && <TatoosModal show={showModal} onClose={handleClose} tatoo={selected}/>}
        </>
    );
};

TatoosList.propTypes = {
    array: PropTypes.array
};

export default TatoosList;
