import React from "react";
import PropTypes from "prop-types";
import Places from "../../common/Form/RadioGroupField/RadioGroupField";

const TatooForm = ({ tatoo, onChange, value }) => {
    const handleChange = (target) => {
        onChange(target.places);
    };
    return (
        <div className="flex-1" >
            <div className="style pt-2">
                <p className="h1 ">Стиль татуировки</p>
                <span className="f2">{tatoo.style}</span>
            </div>
            <div className="size border-top pt-2">
                <p className="h1 ">Размер татуировки</p>
                <p className="f2 mb-1 " >{tatoo.size.name}</p>
                <span className="text-light">{`Примерно ${tatoo.size.size}`}</span>
            </div>
            <div className="places border-top pt-2">
                <p className="h1 py-2">Место нанесения</p>
                <Places name="places" arr={tatoo.place} onChange={handleChange} value={value}/>
            </div>
        </div>
    );
};

TatooForm.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    data: PropTypes.object,
    tatoo: PropTypes.object
};

export default TatooForm;
