import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
    const page = useLocation().pathname;
    return (
        <nav
            className="UnderlineNav"
            data-color-mode="dark"
            data-dark-theme="dark"
            aria-label="Foo bar"
        >
            <div className="UnderlineNav-body ">
                <Link
                    className="UnderlineNav-item"
                    to="/"
                    aria-current={page === "/"}
                >
                    Главная
                </Link>
                <Link
                    className="UnderlineNav-item"
                    to="/styles"
                    aria-current={page.includes("/styles")}
                >
                    Татуировки
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
