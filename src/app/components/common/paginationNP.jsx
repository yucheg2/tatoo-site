import React from "react";
import PropTypes from "prop-types";

const PaginationNP = ({ pageNumber, pagesCount, onPageDicrement, onPageIncrement }) => {
    const prevAriaDisabled = pageNumber === 1;
    const nextAriaDisabled = pageNumber === pagesCount;
    return (
        <nav className="paginate-container" aria-label="Pagination">
            <div className="pagination">
                <span
                    className={"previous_page f2 " + (!prevAriaDisabled ? "color-fg-default" : "")}
                    aria-disabled={prevAriaDisabled}
                    onClick={!prevAriaDisabled ? onPageDicrement : undefined}
                >
                    Назад
                </span>
                <span
                    className={"next_page f2 " + (!nextAriaDisabled ? "color-fg-default" : "")}
                    aria-disabled={nextAriaDisabled}
                    onClick={!nextAriaDisabled ? onPageIncrement : undefined}
                >
                    Далее
                </span>
            </div>
        </nav>
    );
};

PaginationNP.propTypes = {
    onPageIncrement: PropTypes.func.isRequired,
    onPageDicrement: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired
};

export default PaginationNP;
