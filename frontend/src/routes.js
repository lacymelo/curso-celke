import React,  { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Context } from './context/AuthContext';

// import Route from "./components/Route";
import Login from './pages/Login';
import Home from "./pages/Home";
import Users from "./pages/Users";
import New from "./pages/New";

const PrivateRoute = () => {
    const { authenticated } = useContext(Context);
    return authenticated ? <Outlet /> : <Navigate to="/" />;
}

function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path='/home' element={<PrivateRoute/>}>
                <Route path='/home' element={<Home />}/>
            </Route>

            <Route path='/users' element={<PrivateRoute/>}>
                <Route path='/users' element={<Users />}/>
            </Route>

            <Route path='/new' element={<PrivateRoute/>}>
                <Route path='/new' element={<New />}/>
            </Route>
        </Routes>
    );
}

export default AppRoutes;