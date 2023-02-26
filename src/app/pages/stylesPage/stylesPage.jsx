import React from "react";
import PropTypes from "prop-types";
import StylesList from "../../components/ui/stylesList/stylesList";

const StylesPage = (tattoosData) => {
    return (
        <div className="StylesPage">
            <StylesList {...tattoosData}/>
        </div>
    );
};

StylesPage.propTypes = {
    tattoosData: PropTypes.object
};

export default StylesPage;
