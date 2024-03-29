import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import commentsService from "../services/comments.service";
import { toast } from "react-toastify";
import userServuse from "../services/users.servise";

const CommentsContext = React.createContext();

export const useComents = () => useContext(CommentsContext);

const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
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
        setLoading(true);
        try {
            const { data } = await commentsService.get(masterId);
            if (data) {
                setComments(Object.values(data));
            } else {
                setComments([]);
            }
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    const getName = async(id) => {
        try {
            const data = await userServuse.getById(id);
            return data.name;
        } catch (error) {
            errorCatcher(error);
        }
    };
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    return (
        <CommentsContext.Provider value={{ loading, comments, getComments, addComment, getName }}>
            {children}
        </CommentsContext.Provider>
    );
};

export default CommentsProvider;

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
