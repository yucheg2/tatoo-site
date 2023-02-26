import React, { useState, useEffect } from "react";
import MainPageLayout from "./mainPageLayout";
import StylesPage from "../pages/stylesPage/stylesPage";
import tattoosServase from "../services/tattoosServase";
import { useParams } from "react-router-dom";
import TatoosPage from "../pages/tatooPage/tatoosPage";

const Styles = () => {
    const [tattoosData, setTatoosData] = useState();
    const { style } = useParams();
    console.log(tattoosData);
    useEffect(() => {
        tattoosServase.fetchTatoos().then((data) => {
            setTatoosData(data);
        });
    }, []);
    return (
        <MainPageLayout>
            {style
                ? <TatoosPage style={style} {...tattoosData}/>
                : <StylesPage tattoosData={tattoosData}/>
            }
        </MainPageLayout>
    );
};

export default Styles;
