import React from "react";
import PropTypes from "prop-types";

const PaginationNumb = ({ onClick, pagesCount, curentPage }) => {
    const getNumbers = () => {
        const arr = [];
        // eslint-disable-next-line no-unreachable-loop
        for (let i = 1; i <= pagesCount; i++) {
            arr.push(
                <span
                    key={i}
                    aria-label={`Page ${i}`}
                    aria-current={curentPage === i ? "page" : "false"}
                    onClick={() => { onClick(i); }}
                    className="f2 mr-2"
                >
                    {i}
                </span>
            );
        }
        return arr;
    };
    if (pagesCount > 2) {
        return (
            <nav className="paginate-container" aria-label="Pagination">
                <div className="pagination">
                    {getNumbers()}
                </div>
            </nav>
        );
    }
};

PaginationNumb.propTypes = {
    onClick: PropTypes.func.isRequired,
    pagesCount: PropTypes.number.isRequired,
    curentPage: PropTypes.number.isRequired
};

export default PaginationNumb;
