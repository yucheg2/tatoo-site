import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PageCard = ({ linkTo, img, count, name, onClick }) => {
    return (
        linkTo
            ? <Link to={linkTo}>
                <div
                    className="container border color-border-done-emphasis p-3"
                    style={{
                        backgroundImage: `url( ${img} )`,
                        backgroundSize: "cover",
                        height: "350px"
                    }}
                >
                    {name && <h2>{name}</h2>}
                    {count
                        ? <div className="count">
                            <p>{count}</p>
                        </div>
                        : <div className="hover">
                            <p>Смотреть</p>
                        </div>
                    }
                </div>
            </Link>
            : <div
                className="container border color-border-done-emphasis p-3"
                onClick={onClick}
                style={{
                    backgroundImage: `url( ${img} )`,
                    backgroundSize: "cover",
                    height: "350px",
                    cursor: "pointer"
                }}
            >
                {name && <h2>{name}</h2>}
                {count
                    ? <div className="count">
                        <p>{count}</p>
                    </div>
                    : <div className="hover">
                        <p>Смотреть</p>
                    </div>
                }
            </div>
    );
};

PageCard.propTypes = {
    onClick: PropTypes.func,
    linkTo: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    count: PropTypes.number
};

export default PageCard;
