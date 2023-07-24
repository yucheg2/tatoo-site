import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentItem from "./commItem";
import { useDispatch } from "react-redux";
import { removeComment } from "../../../store/comments";
import PaginationNumb from "../../common/paginationNum";
import PaginationNP from "../../common/paginationNP";
import paginate from "../../../utils/paginate";

const CommentsList = ({ comments, isMaster }) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const pageSize = 5;
    const pageCount = Math.ceil(comments.length / pageSize);
    const paginatedData = paginate(page, pageSize, comments);
    const handleInc = () => {
        setPage((prev) => prev + 1);
    };
    const handleDic = () => {
        setPage((prev) => prev - 1);
    };
    const handlePageNum = (num) => {
        setPage(num);
    };
    const handleDelete = (commentId) => {
        dispatch(removeComment(commentId));
    };
    return (
        <div className="commentsList border-top mt-3">
            {comments.length === 0
                ? <p className="text-center lead">Отзывов нет</p>
                : <>
                    {paginatedData.map((c) => {
                        return (
                            <CommentItem onDelete={handleDelete} isMaster={isMaster} key={c._id}{...c}/>
                        );
                    })}
                    <div className="pagination d-flex flex-justify-between">
                        <div className="paginationNumb ml-3">
                            <PaginationNumb
                                onClick={handlePageNum}
                                pagesCount={pageCount}
                                curentPage={page}
                            />
                        </div>
                        <div className="paginationNP mb-5">
                            <PaginationNP
                                onPageDicrement= {handleDic}
                                onPageIncrement= {handleInc}
                                pageNumber={page}
                                pagesCount={pageCount}
                            />
                        </div>
                    </div>
                </> }
        </div>);
};

export default CommentsList;

CommentsList.propTypes = {
    isMaster: PropTypes.bool,
    comments: PropTypes.array
};
