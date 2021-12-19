import React from 'react'
import { Navigate } from 'react-router-dom';
import { UseGlobalContext } from '../Provider/Context';

const PrivateRoute = ({ children }) => {
    const { currentUser } = UseGlobalContext()


    return currentUser ? children : <Navigate to='/user/login' replace />
    // return !user || Object.keys(user).length !== 0 ? children : <Navigate to='/user/login' replace />

}

export default PrivateRoute
