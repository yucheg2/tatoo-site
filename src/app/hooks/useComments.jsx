import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import commentsService from "../services/commentsService";

const CommentsContext = React.createContext();

export const useComents = () => useContext(CommentsContext);

const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const addComment = async(masterId, data) => {
        try {
            commentsService.add(masterId, data).then(() => {
                setComments((p) => [...p, data]);
            });
        } catch (error) {
            console.log(error);
        }
    };
    const getComments = (masterId) => {
        try {
            commentsService.get(masterId).then(({ data }) => { setComments(Object.values(data)); });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <CommentsContext.Provider value={{ comments, getComments, addComment }}>
            {children}
        </CommentsContext.Provider>
    );
};

export default CommentsProvider;

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
