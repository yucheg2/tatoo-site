import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as TrashIcon } from "../../../../icons/trashIcon.svg";

const CommentItem = ({ com, rate, name, onDelete, isMaster, _id }) => {
    return (
        <div className="d-flex">
            <div className="mt-3 flex-auto">
                {
                    <p className="mb-1 h4"> {name} </p>
                }
                <span>{com}</span>
                <p>Оценка:{rate}/5</p>
            </div>
            {
                isMaster && <button onClick={() => { onDelete(_id); }} className="btn btn-danger flex-self-center">
                    <TrashIcon size={16}/>
                </button>
            }

        </div>
    );
};

export default CommentItem;

CommentItem.propTypes = {
    isMaster: PropTypes.bool,
    onDelete: PropTypes.func,
    com: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string,
    rate: PropTypes.number
};
