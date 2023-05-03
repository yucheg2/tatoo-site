import React from "react";
import PropTypes from "prop-types";
import PaginationNP from "../paginationNP";
import "./index.css";

const Carousel = ({ children, pageNumber, pagesCount, onPageDicrement, onPageIncrement }) => {
    return (
        <div className="carousel-main">
            <div className="carousel-window">
                <div
                    className="carousel-items d-flex"
                    style={{
                        transform: `translateX(-${(pageNumber - 1) * 300}px)`
                    }}
                >
                    {children}
                </div>
            </div>

            {pagesCount > 1 && <PaginationNP
                pageNumber={pageNumber}
                pagesCount={pagesCount}
                onPageDicrement={onPageDicrement}
                onPageIncrement={onPageIncrement}/>}
        </div>
    );
};

export default Carousel;

Carousel.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onPageIncrement: PropTypes.func.isRequired,
    onPageDicrement: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired
};
