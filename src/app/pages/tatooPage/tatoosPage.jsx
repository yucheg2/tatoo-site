import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TatoosPage = ({ style, styles }) => {
    console.log(styles);
    const getDescription = (style) => {
        return (Object.values(styles).find((s) => s.name === style)).description;
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
            <div className="description">
                <h1 className="h2-mktg mb-4" style={{ userSelect: "none" }}>Татуировки в стиле {style}</h1>
                <div className="text f3-mktg">
                    <span>{getDescription(style)}</span>
                </div>
            </div>
        </div>);
};

TatoosPage.propTypes = {
    style: PropTypes.string,
    styles: PropTypes.object
};

export default TatoosPage;
