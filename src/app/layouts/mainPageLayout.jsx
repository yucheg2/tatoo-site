import React from "react";
import NavBar from "../components/ui/navigation/navBar";
import PropTypes from "prop-types";

const MainPageLayout = ({ children }) => {
    return (
        <div className="mainPageLayout" >
            <header data-color-mode="dark">
                <NavBar />
                <div className="d-flex p-4 flex-justify-center color-bg-subtle mb-2">
                    <div className="mr-4">
                        <h2>+7 (495) 371-35-26</h2>
                        <p>ежедневно с 8:00 до 22:00</p>
                    </div>
                    <button className="btn btn-large mb-2 border-dashed color-bg-attention">
                        Записатсья на консультацию
                    </button>
                </div>
            </header>
            {children}
        </div>
    );
};

MainPageLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default MainPageLayout;
