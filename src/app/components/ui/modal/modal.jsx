import React from "react";
import "./index.css";
import PropTypes from "prop-types";

const Modal = ({ img, onClose, show, reference }) => {
    return (
        <div
            className="modal"
            onClick={onClose}
            style={{ display: show ? "block" : "none" }}
        >
            <div className="modal-content" ref={reference} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="button" onClick={onClose} >
                        Close
                    </button>
                </div>
                <div className="modal-body" >
                    <img src={img} alt=""/>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    reference: PropTypes.object,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    img: PropTypes.string
};
export default Modal;
