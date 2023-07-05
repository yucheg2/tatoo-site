import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserSelector } from "../../store/users";

const ProtectedRoute = ({ children, component: Component, ...rest }) => {
    const currentUser = useSelector(getCurrentUserSelector());
    return (<Route {...rest} render={(props) => {
        if (!currentUser) {
            return <Redirect to="/"/>;
        }
        return Component
            ? <Component {...props}/>
            : children;
    }}/>);
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    component: PropTypes.func
};
