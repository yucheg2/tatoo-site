import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogRegLayout from "../../../layouts/logRegLayout";
import Modal from "../../common/modal/modal";
import routes from "../../../routes";
import DropDown from "./dropdown";
import "./index.css";
import { useSelector } from "react-redux";
import { getNavCountSelector } from "../../../store/count";
import { getCurrentUserSelector } from "../../../store/users";

const NavBar = () => {
    const [show, setShow] = useState(false);
    const currentUser = useSelector(getCurrentUserSelector());
    const currentCount = useSelector(getNavCountSelector());
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
            <div
                className="UnderlineNav"
                data-color-mode="dark"
                data-dark-theme="dark"
                aria-label="Foo bar"
            >
                <div className="UnderlineNav-body ">
                    {
                        routes.map((rout) => {
                            if (!((rout.protected && !currentUser) || (rout.name === "Заказы" && currentUser.rate) || (rout.display === false))) {
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
                <div className="UnderlineNav-actions" >
                    {currentUser
                        ? <DropDown {...currentUser}/>
                        : <button className="btn btn-primary" onClick={() => { setShow(true); }}>Войти</button>}
                </div>
            </div>
            <Modal onClose={handleShow} show={show}>
                <div className="register-page d-flex flex-column">
                    <LogRegLayout init={"log"} onSubmit={() => { setShow(false); }}/>
                </div>
            </Modal>
        </>
    );
};

export default NavBar;
