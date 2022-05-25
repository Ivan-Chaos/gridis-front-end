import { Navigate, Route, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelect } from '@mui/base';
import { useSelector } from 'react-redux';

const PrivateRoute = ({roles}) => {

    const role = useSelector(state=>state.account.role);
    const jwt = useSelector(state=>state.account.jwt);

    return jwt!=='' ? roles.includes(role)? <Outlet /> : <Navigate to="/" />
    : <Navigate to="/login" />;
}
export default PrivateRoute;