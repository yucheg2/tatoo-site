import React from "react";
import PropTypes from "prop-types";
import CommentItem from "./commItem";

const CommentsList = ({ comments }) => {
    return (
        <div className="commentsList border-top mt-3">
            {comments.length === 0
                ? <p className="text-center lead">Отзывов нет</p>
                : comments.map((c) => {
                    return (
                        <CommentItem key={c._id}{...c}/>
                    );
                })}
        </div>);
};

export default CommentsList;

CommentsList.propTypes = {
    comments: PropTypes.array
};
