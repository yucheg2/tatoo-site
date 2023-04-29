import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import commentsService from "../services/commentsService";
import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComents = () => useContext(CommentsContext);

const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState();
    const addComment = async(masterId, data) => {
        try {
            commentsService.add(masterId, data).then(() => {
                setComments((p) => [...p, data]);
            });
        } catch (error) {
            errorCatcher(error);
        }
    };
    const getComments = async(masterId) => {
        try {
            const { data } = await commentsService.get(masterId);
            if (data) {
                setComments(Object.values(data));
            } else {
                setComments([]);
            }
        } catch (error) {
            errorCatcher(error);
        }
    };
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
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
