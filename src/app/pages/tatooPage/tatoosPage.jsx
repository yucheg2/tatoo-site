import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TatoosList from "../../components/ui/tatoosList/tatoosList";

const TatoosPage = ({ style, styles, tatoos }) => {
    const getDescription = (style) => {
        return (Object.values(styles).find((s) => s.name === style)).description;
    };
    const getTatoos = () => {
        return tatoos.filter((tatoo) => tatoo.style === style);
    };
    return (
        <div className="container-lg clearfix">
            <nav aria-label="Breadcrumb">
                <ol>
                    <li className="breadcrumb-item">
                        <Link to="/styles" className="f3-mktg">Стили</Link>
                    </li>
                    <li className="breadcrumb-item breadcrumb-item-selected">
                        <Link to={"/styles/" + style} className="f3-mktg">{style}</Link>
                    </li>
                </ol>
            </nav>
            <div className="description p-4">
                <h1 className="h2-mktg mb-4" style={{ userSelect: "none" }}>Татуировки в стиле {style}</h1>
                <div className="text f2-mktg">
                    <span>{getDescription(style)}</span>
                </div>
            </div>
            <div className="tatoosList">
                <TatoosList array={getTatoos()}/>
            </div>
        </div>);
};

TatoosPage.propTypes = {
    style: PropTypes.string,
    styles: PropTypes.object,
    tatoos: PropTypes.array
};

export default TatoosPage;
