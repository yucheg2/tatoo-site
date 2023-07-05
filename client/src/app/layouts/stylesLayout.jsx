import React from "react";
import StylesPage from "../pages/stylesPage/stylesPage";
import { Redirect, useParams } from "react-router-dom";
import TatoosPage from "../pages/tatooPage/tatoosPage";
import { useSelector } from "react-redux";
import { getTatoosSelector } from "../store/tatoo";
import { getStylesSelector } from "../store/styles";

const StylesLayout = () => {
    const tatoos = useSelector(getTatoosSelector());
    const styles = useSelector(getStylesSelector());
    const { style } = useParams();

    const styleExist = Object.values(styles).some(s => s.name === style);

    if (!styleExist && style) {
        return <Redirect to="/styles"/>;
    }
    return (
        style
            ? <TatoosPage style={style} tatoos={tatoos} styles={styles}/>
            : <StylesPage tatoos={tatoos} styles={styles}/>
    );
};

export default StylesLayout;
