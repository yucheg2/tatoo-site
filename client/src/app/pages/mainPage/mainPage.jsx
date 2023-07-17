import React from "react";

const MainPage = () => {
    return (
        <div className="container-lg">
            <div>
                <h1>
                        OOZYTATTOO - ПЕРВОЕ МЕСТО В РЕЙТИНГЕ БОБРУЙСКА 2022 ГОДА
                </h1>
            </div>

            <div className="d-flex flex-justify-center mt-4">
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
        </div>
    );
};

export default MainPage;
