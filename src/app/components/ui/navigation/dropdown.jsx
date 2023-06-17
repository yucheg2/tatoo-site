import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";
import Modal from "../../common/modal/modal";
import EditForm from "../editForm/editForm";
import Celendar from "../celendar/celendar";
import { useDispatch } from "react-redux";
import { clearNavCount } from "../../../store/count";

const DropDown = (data) => {
    const dispatch = useDispatch();
    const { signOut } = useAuth();
    const handleQuit = () => {
        dispatch(clearNavCount());
        signOut();
    };
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState("");

    const orderLength = data?.order && Object.values(data.order).length;

    const handleEdit = () => {
        setOpen(false);
        setStatus("Edit");
        setShow(true);
    };

    const handleSession = () => {
        setOpen(false);
        setStatus("Session");
        setShow(true);
    };

    const handleCloseModal = () => {
        setShow(false);
    };
    return (
        <div className="dd-wrapper">
            <div className="dd-header">
                <button className="btn" onClick={() => { setOpen((p) => !p); }}>
                    {data.name}
                    {
                        data.order && !open && orderLength > 0 &&
                        <span className="Counter mr-1 color-bg-success-emphasis color-fg-on-emphasis anim-scale-in">
                            {orderLength}
                        </span>
                    }
                    <div className="dropdown-caret"></div>
                </button>
            </div>

            { open && <ul className="dd-list dropdown-menu dropdown-menu-sw">
                <li className="dd-list-item ">
                    <a className="dropdown-item" onClick={handleEdit}>Редактировать</a>
                </li>
                <li className="dd-list-item">
                    <a className="dropdown-item" onClick={handleSession}>Сеансы
                        {data.order && <span className="Counter mr-1">{orderLength}</span>}
                    </a>
                </li>
                <li className="dd-list-item">
                    <a className="dropdown-item" onClick={handleQuit}>Выйти</a>
                </li>
            </ul>}
            <div data-color-mode="light" data-light-theme="light">
                <Modal show={show} onClose={handleCloseModal}>
                    {status === "Edit"
                        ? <EditForm {...data}/>
                        : <Celendar order={data.order}/>
                    }
                </Modal>
            </div>
        </div>
    );
};

export default DropDown;

DropDown.propTypes = {
    order: PropTypes.object,
    name: PropTypes.string,
    phone: PropTypes.string
};
