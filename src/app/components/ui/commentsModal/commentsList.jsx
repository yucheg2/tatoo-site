import React from "react";
import PropTypes from "prop-types";

const CommentsList = ({ comments }) => {
    return (
        <div className="commentsList border-top mt-3">
            {comments.length === 0
                ? <p className="text-center lead">Отзывов нет</p>
                : comments.map((c) => {
                    return (
                        <div className="mt-3" key={c.com + c.name}>
                            <p className="mb-1 h4">{c.name}</p>
                            <span>{c.com}</span>
                            <p>Оценка:{c.rate}/5</p>
                        </div>
                    );
                })}
        </div>);
};

export default CommentsList;

CommentsList.propTypes = {
    comments: PropTypes.array
};
