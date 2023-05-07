import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useComents } from "../../../hooks/useComments";

const CommentItem = ({ com, rate, name }) => {
    const [trueName, setName] = useState();
    const { getName } = useComents();
    async function getTrueName() {
        const n = await getName(name);
        setName(n);
    }
    useEffect(() => {
        getTrueName();
    }, []);
    return (
        <div className="mt-3">
            {
                trueName
                    ? <p className="mb-1 h4"> {trueName} </p>
                    : <><span>Loading</span><span className="AnimatedEllipsis"></span></>
            }
            <span>{com}</span>
            <p>Оценка:{rate}/5</p>
        </div>
    );
};

export default CommentItem;

CommentItem.propTypes = {
    com: PropTypes.string,
    name: PropTypes.string,
    rate: PropTypes.number
};
