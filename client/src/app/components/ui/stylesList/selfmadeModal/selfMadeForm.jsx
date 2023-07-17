import React from "react";
import PropTypes from "prop-types";
import SelectField from "../../../common/Form/selectField/selectField";
import RadioGroupField from "../../../common/Form/radioGroupField/radioGroupField";

const SelfMadeForm = ({ styles, sizes, places, sizeDescription, valueObj, handleChange }) => {
    return (
        <div className="flex-1" >
            <div className="style pt-2">
                <SelectField
                    label="Выберите стиль"
                    arr={styles}
                    defaultOption="Стили"
                    value={valueObj.style}
                    name="style"
                    onChange={handleChange}
                    labelClass="h1"
                />
            </div>
            <div className="size border-top pt-2 d-flex flex-column">
                <SelectField
                    label="Выберите размер"
                    arr={sizes}
                    defaultOption="Размеры"
                    value={valueObj.size}
                    name="size"
                    onChange={handleChange}
                    labelClass="h1"
                />
                { sizeDescription &&
                <span className="text-light flex-self-end">{sizeDescription}</span>
                }
            </div>
            <div className="places border-top pt-2">
                <p className="h1 py-2">Место нанесения</p>
                <RadioGroupField name="place" arr={places} onChange={handleChange} value={valueObj.place}/>
            </div>
        </div>
    );
};

export default SelfMadeForm;

SelfMadeForm.propTypes = {
    handleChange: PropTypes.func,
    valueObj: PropTypes.object,
    styles: PropTypes.array,
    sizes: PropTypes.array,
    places: PropTypes.array,
    sizeDescription: PropTypes.string
};
