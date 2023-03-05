import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import ImageCard from "../imageCard/imageCard";
import Modal from "../modal/modal";

const TatoosList = ({ array }) => {
    const modal = useRef();
    const [showModal, setShowModal] = useState(false);
    const handleChoose = (e) => {
        setShowModal(true);
        modal.current.children[1].children[0].src = e;
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
                        img={`/${t.src}`}
                    />
                </div>;
            })}
            <Modal show={showModal} onClose={handleClose} reference={modal}/>
        </>
    );
};

TatoosList.propTypes = {
    array: PropTypes.array
};

export default TatoosList;
