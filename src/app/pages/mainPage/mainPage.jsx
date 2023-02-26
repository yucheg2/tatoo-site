import React from "react";
import MainPageLayout from "../../layouts/mainPageLayout";

const MainPage = () => {
    return (
        <MainPageLayout>
            <div className="container-lg">
                <div>
                    <h1>
                        OOZYTATTOO - ПЕРВОЕ МЕСТО В РЕЙТИНГЕ БОБРУЙСКА 2022 ГОДА
                    </h1>
                </div>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/nGfbT24qPaQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </MainPageLayout>
    );
};

export default MainPage;
