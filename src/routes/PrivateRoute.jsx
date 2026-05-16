import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/common/Loading';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, userStatus, loading, roleLoading } = use(AuthContext)

    if (loading || roleLoading) {
        return <Loading />
    }
    if (!user || !userStatus=='Active') {
        return <Navigate to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;