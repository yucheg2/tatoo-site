import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CommentsModal from "../commentsModal/commentsModal";
import { useComents } from "../../../hooks/useComments";

const MasterItem = ({ name, img, rate, description, favStyles, _id }) => {
    const { comments, getComments } = useComents();
    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow(p => !p);
    };
    const openComments = () => {
        setShow(true);
        getComments(_id);
    };
    return (
        <div className="col-9 mx-auto d-flex">
            <img className="masterAvatar mt-2 mr-3" src={img} alt="" />
            <div>
                <div className="d-flex">
                    <p className="h2 flex-auto">{name}</p>
                    <p className="text-semibold"> Рейтинг: {rate}/5</p>
                </div>
                <p className="lead">{description}</p>
                <div className="d-flex">
                    <a onClick={openComments} className="Link flex-auto mt-1">Отзывы</a>
                    <div className="favStyles d-flex">
                        <p className="text-emphasized mr-2 mt-1">Любимые стили:</p>
                        <div className="BtnGroup">
                            {Object.values(favStyles).map((s) => {
                                return <Link className="BtnGroup-item btn btn-sm" to={`/styles/${s}`} key={s}>{s}</Link>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <CommentsModal masterId={_id} comments={comments} show={show} onClose={toggleShow}/>

        </div>
    );
};

export default MasterItem;

MasterItem.propTypes = {
    _id: PropTypes.string,
    favStyles: PropTypes.object,
    name: PropTypes.string,
    img: PropTypes.string,
    rate: PropTypes.number,
    description: PropTypes.string
};
