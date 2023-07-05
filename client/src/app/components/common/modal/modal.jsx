import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Modal = ({ children, onClose, show }) => {
    return (
        <div
            className="modal"
            onClick={onClose}
            style={{ display: show ? "flex" : "none" }}
        >
            <div className="modal-content d-flex flex-column" onClick={e => e.stopPropagation()}>
                <div className="modal-header d-flex flex-justify-end mb-2">
                    <button className="close-button" onClick={onClose} >
                        <span className="color-fg-on-emphasis h2">Закрыть</span>
                    </button>
                </div>
                <div className="modal-body p-3 Box Box--overlay">
                    {children}
                </div>
            </div>
        </div>);
};

Modal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};
export default Modal;
