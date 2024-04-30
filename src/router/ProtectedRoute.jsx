import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ProtectedRoute() {
    const navigate = useNavigate();
    if (!localStorage.getItem('accessToken')) return navigate('/login');
    return <Outlet />;
}
