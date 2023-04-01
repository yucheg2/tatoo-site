import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogRegLayout from "../../../layouts/logRegLayout";
import Modal from "../../common/modal/modal";
import routes from "../../../routes";
import useNavCount from "../../../hooks/useNavCount";
const NavBar = () => {
    const [show, setShow] = useState(false);
    const { currentCount } = useNavCount;
    const handleShow = () => {
        setShow(false);
    };
    const page = useLocation().pathname;
    const isSelected = (path) => {
        return path === "/"
            ? page === path
            : page.includes(path);
    };
    return (
        <>
            <nav
                className="UnderlineNav"
                data-color-mode="dark"
                data-dark-theme="dark"
                aria-label="Foo bar"
            >
                <div className="UnderlineNav-body ">
                    {
                        routes.map((rout) => {
                            if (rout.display !== false) {
                                return (
                                    <Link
                                        key={rout.path}
                                        className="UnderlineNav-item"
                                        to={rout.path}
                                        aria-current={isSelected(rout.path)}
                                    >
                                        {rout.name}
                                        {rout.counter && currentCount > 0 &&
                                            <span className="Counter">{currentCount}</span>}
                                    </Link>
                                );
                            }
                            return null;
                        })
                    }
                </div>
                <div className="UnderlineNav-actions">
                    <button className="btn btn-primary" onClick={() => { setShow(true); }}>Войти</button>
                </div>
            </nav>
            <Modal onClose={handleShow} show={show}>
                <div className="register-page d-flex flex-column">
                    <LogRegLayout/>
                </div>
            </Modal>
        </>
    );
};

export default NavBar;
