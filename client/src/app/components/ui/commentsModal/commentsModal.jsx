import React from "react";
import PropTypes from "prop-types";
import Modal from "../../common/modal/modal";
import CommentsList from "./commentsList";
import "./index.css";
import { localStorageService } from "../../../services/localstorage.service";

const CommentsModal = ({ show, onClose, comments, loading, masterId }) => {
    const isMaster = localStorageService.getUserId() === masterId;
    return (
        <Modal show={show} onClose={onClose}>
            <h2 className="text-center h2 color-fg-subtle mb-0">Отзывы</h2>
            {!loading
                ? <CommentsList comments={comments} isMaster={isMaster}/>
                : <span className="Label mt-3"><span>Загрузка</span><span className="AnimatedEllipsis"></span></span>
            }
        </Modal>
    );
};

export default CommentsModal;

CommentsModal.propTypes = {
    masterId: PropTypes.string,
    loading: PropTypes.bool,
    comments: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
    show: PropTypes.bool,
    onClose: PropTypes.func
};
