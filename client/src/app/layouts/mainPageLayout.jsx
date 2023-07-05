import React, { useEffect } from "react";
import NavBar from "../components/ui/navigation/navBar";
import PropTypes from "prop-types";
import CommentsProvider from "../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import { getTatoosIsloadingSelector, loadTatoos } from "../store/tatoo";
import { getStylesIsloadingSelector, loadStyles } from "../store/styles";
import { loadSizes } from "../store/sizes";
import { loadPlaces } from "../store/places";
import { getMasterLoadingStatusSelector, loadMasters } from "../store/masters";
import { loadCurrentUser } from "../store/users";

const MainPageLayout = ({ children }) => {
    const handleClick = () => {

    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCurrentUser());
        dispatch(loadTatoos());
        dispatch(loadStyles());
        dispatch(loadSizes());
        dispatch(loadPlaces());
        dispatch(loadMasters());
    }, []);
    const tatoosLoading = useSelector(getTatoosIsloadingSelector());
    const stylesLoading = useSelector(getStylesIsloadingSelector());
    const mastersLoading = useSelector(getMasterLoadingStatusSelector());
    return (
        <CommentsProvider>
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
            { !(tatoosLoading || stylesLoading || mastersLoading)
                ? children
                : <h1 className="text-center"><span>загрузка</span><span className="AnimatedEllipsis"></span></h1>
            }
        </CommentsProvider>
    );
};

MainPageLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default MainPageLayout;
