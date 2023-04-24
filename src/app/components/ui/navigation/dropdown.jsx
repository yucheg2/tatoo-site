import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";
import { useNavCount } from "../../../hooks/useNavCount";

const DropDown = ({ name, phone }) => {
    const { signOut } = useAuth();
    const { clearCount } = useNavCount();
    const handleQuit = () => {
        signOut();
        clearCount();
    };
    return (
        <div className="dropdown" onClick={handleQuit}>
            <button className="btn ">
                {name}
            </button>
        </div>
    );
};

export default DropDown;

DropDown.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string
};
