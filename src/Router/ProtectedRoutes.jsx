import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
    const {profileData,isAccountActive} = useSelector(state=>state.userProfile)

    if (profileData && !profileData.owner) {
        return <Navigate to="/main/login" />;
    }
    // else{
    //     if (profileData && profileData.owner && profileData.profileType !=1) {
    //         return <Navigate to="/" />;
    //     }
    // }

    return element;
};

export default ProtectedRoute;
