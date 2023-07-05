import React from "react";
import PropTypes from "prop-types";

const CommentItem = ({ com, rate, name }) => {
    return (
        <div className="mt-3">
            {
                <p className="mb-1 h4"> {name} </p>
            }
            <span>{com}</span>
            <p>Оценка:{rate}/5</p>
        </div>
    );
};

export default CommentItem;

CommentItem.propTypes = {
    com: PropTypes.string,
    name: PropTypes.string,
    rate: PropTypes.number
};
