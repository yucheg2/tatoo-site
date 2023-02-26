import React from "react";
import StylesCards from "../../components/ui/stylesCards/stylesCards";
import PropTypes from "prop-types";

const StylesPage = ({ tattoosData }) => {
    return (
        tattoosData
            ? <div className="StylesPage">
                <StylesCards {...tattoosData}/>
            </div>
            : "loading..."
    );
};

StylesPage.propTypes = {
    tattoosData: PropTypes.object
};

export default StylesPage;
