import React from "react";
import PropTypes from "prop-types";
import CommentItem from "./commItem";
import { useDispatch } from "react-redux";
import { removeComment } from "../../../store/comments";

const CommentsList = ({ comments, isMaster }) => {
    const dispatch = useDispatch();
    const handleDelete = (commentId) => {
        dispatch(removeComment(commentId));
    };
    return (
        <div className="commentsList border-top mt-3">
            {comments.length === 0
                ? <p className="text-center lead">Отзывов нет</p>
                : comments.map((c) => {
                    return (
                        <CommentItem onDelete={handleDelete} isMaster={isMaster} key={c._id}{...c}/>
                    );
                })}
        </div>);
};

export default CommentsList;

CommentsList.propTypes = {
    isMaster: PropTypes.bool,
    comments: PropTypes.array
};
