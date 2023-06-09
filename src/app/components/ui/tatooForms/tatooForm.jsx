import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Places from "../../common/Form/radioGroupField/radioGroupField";

const TatooForm = ({ tatoo, onChange, value }) => {
    const handleChange = (target) => {
        if (onChange) {
            onChange(target.places);
        }
    };
    useEffect(() => {
        if (onChange && tatoo.place.length === 1) {
            onChange(tatoo.place[0]);
        }
    });

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
                {tatoo.place.length > 1
                    ? <Places name="places" arr={tatoo.place} onChange={handleChange} value={value}/>
                    : <div className="d-flex">
                        <p className="border rounded-3 p-2 px-3 text-semibold" style={{ width: "auto" }}>{tatoo.place[0]}</p>
                    </div>

                }
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
