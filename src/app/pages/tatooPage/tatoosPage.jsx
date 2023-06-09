import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TatoosList from "../../components/ui/tatoosList/tatoosList";
import PaginationNP from "../../components/common/paginationNP";
import paginate from "../../utils/paginate";
import PaginationNumb from "../../components/common/paginationNum";

const TatoosPage = ({ style, styles, tatoos }) => {
    const [page, setPage] = useState(1);

    const getDescription = (style) => {
        return (Object.values(styles).find((s) => s.name === style)).description;
    };
    const filteredTatoos = tatoos.filter((tatoo) => tatoo.style === style);

    const pageSize = 6;
    const pageCount = Math.ceil(filteredTatoos.length / pageSize);
    const paginatedData = paginate(page, pageSize, filteredTatoos);
    const handleInc = () => {
        setPage((prev) => prev + 1);
    };
    const handleDic = () => {
        setPage((prev) => prev - 1);
    };
    const handlePageNum = (num) => {
        setPage(num);
    };
    return (
        <div className="container-lg d-flex flex-column">
            <nav aria-label="Breadcrumb">
                <ol>
                    <li className="breadcrumb-item">
                        <Link to="/styles" className="f2-mktg">Стили</Link>
                    </li>
                    <li className="breadcrumb-item breadcrumb-item-selected">
                        <Link to={"/styles/" + style} className="f2-mktg">{style}</Link>
                    </li>
                </ol>
            </nav>
            <div className="discription p-4">
                <h1 className="h2-mktg mb-4" style={{ userSelect: "none" }}>Татуировки в стиле {style}</h1>
                <div className="text f2-mktg">
                    <span>{getDescription(style)}</span>
                </div>
            </div>
            <div className="tatoosList">
                <TatoosList array={paginatedData}/>
            </div>
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
        </div>);
};

TatoosPage.propTypes = {
    style: PropTypes.string,
    styles: PropTypes.object,
    tatoos: PropTypes.array
};

export default TatoosPage;
