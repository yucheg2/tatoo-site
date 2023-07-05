import PropTypes from "prop-types";
import React from "react";

const PhotoFiedl = ({ img, onChange }) => {
    return (
        <div>
            <img src={img} alt="Вставте эскиз" className="img-modal mr-4 color-shadow-large"/>
            <input type="file" onChange={onChange}/>
        </div>
    );
};

export default PhotoFiedl;

PhotoFiedl.propTypes = {
    img: PropTypes.string,
    onChange: PropTypes.func
};
