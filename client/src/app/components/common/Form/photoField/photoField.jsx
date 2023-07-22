import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import imgService from "../../../../services/selfMade.service";
import "./index.css";

const PhotoFiedl = ({ img, onChange, currentUser }) => {
    const [imgFile, setImgFile] = useState(null);

    useEffect(() => {
        if (imgFile && currentUser) {
            try {
                const data = new FormData();
                data.append("sketch", imgFile);

                imgService.upload(data)
                    .then(res => onChange(res.path));
            } catch (error) {
                toast.error(error.message);
            }
        }
    }, [imgFile]);

    const handleChange = (file) => {
        if (!currentUser) {
            return toast.error("Вы не авторизованы");
        }
        if (file?.type.includes("image")) {
            setImgFile(file);
        } else {
            toast.error("Вставте фотографию");
        }
    };
    return (
        <div className="photoFiel d-flex flex-column flex-auto mr-4">
            {
                img
                    ? <img src={img} alt="Вставте эскиз" className="img-modal color-shadow-large"/>
                    : <div className="emptyPhoto border-dashed p-2 d-flex flex-justify-center flex-items-center rounded-2 flex-auto">
                        <span>Загрузите скетч</span>
                    </div>
            }
            <label className="btn text-center border-top-0 rounded-top-0" htmlFor="photoInput">
                Выбрать файл
            </label>
            <input className="photoInput" id="photoInput" type="file" onChange={e => handleChange(e.target.files[0])}/>
        </div>
    );
};

export default PhotoFiedl;

PhotoFiedl.propTypes = {
    currentUser: PropTypes.object,
    img: PropTypes.string,
    onChange: PropTypes.func
};
