import React from "react";
import NavBar from "../components/ui/navigation/navBar";
import PropTypes from "prop-types";
import { useTatoos } from "../hooks/useTatoo";
import { useStyles } from "../hooks/useStyles";
import NavCountProvider from "../hooks/useNavCount";
import CommentsProvider from "../hooks/useComments";

const MainPageLayout = ({ children }) => {
    const handleClick = () => {

    };
    const tatoos = useTatoos();
    const styles = useStyles();
    return (
        <CommentsProvider>
            <NavCountProvider>
                <header className="mainPageLayout" >
                    <div data-color-mode="dark">
                        <NavBar />
                        <div className="d-flex p-4 flex-justify-center color-bg-subtle mb-2" >
                            <div className="mr-4">
                                <h2>+7 (495) 371-35-26</h2>
                                <p>ежедневно с 8:00 до 22:00</p>
                            </div>
                            <button onClick={handleClick} className="btn btn-large mb-2 border-dashed color-bg-attention">
                        Записатсья на консультацию
                            </button>
                        </div>
                    </div>
                </header>
                { !(tatoos.loading || styles.loading)
                    ? children
                    : <h1 className="text-center"><span>загрузка</span><span className="AnimatedEllipsis"></span></h1>
                }
            </NavCountProvider>
        </CommentsProvider>
    );
};

MainPageLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default MainPageLayout;
