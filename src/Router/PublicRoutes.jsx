import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element }) => {
    const {profileData,isAccountActive} = useSelector(state=>state.userProfile)
    const location = useLocation();

    if (profileData && profileData.owner) {
        const from = location.state?.from?.pathname || "/main/";
        return <Navigate to={from} />;
    }

    return element;
};

export default PublicRoute;
