import React from "react";
import MainPageLayout from "./mainPageLayout";
import StylesPage from "../pages/stylesPage/stylesPage";
import { useParams } from "react-router-dom";
import TatoosPage from "../pages/tatooPage/tatoosPage";
import { useTatoos } from "../hooks/useTatoo";
import { useStyles } from "../hooks/useStyles";

const StylesLayout = () => {
    const { tatoos } = useTatoos();
    const { styles } = useStyles();
    const { style } = useParams();
    return (
        <MainPageLayout>
            {
                tatoos && styles
                    ? style
                        ? <TatoosPage style={style} tatoos={tatoos} styles={styles}/>
                        : <StylesPage tatoos={tatoos} styles={styles}/>
                    : <h2><span>Падажи</span><span className="AnimatedEllipsis"></span></h2>
            }
        </MainPageLayout>
    );
};

export default StylesLayout;
