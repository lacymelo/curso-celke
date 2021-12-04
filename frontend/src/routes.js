import React from "react";
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from "./pages/Home";

import {AuthProvider} from './context/AuthContext';

function AppRoutes(){
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="home" element={<Home />} />
            </Routes>
        </AuthProvider>
    );
}

export default AppRoutes;