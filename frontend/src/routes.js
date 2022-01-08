import React,  { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Context } from './context/AuthContext';

// import Route from "./components/Route";
import Login from './pages/Login';
import Home from "./pages/Home";
import Users from "./pages/Users";
import New from "./pages/New";
import EditUser from "./pages/EditUser";
import ViewUser from "./pages/ViewUser";
import RedefinePassword from "./pages/RedefinePassword";
import ViewProfile from "./pages/ViewProfile";

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

            <Route path='/edit-user/:id' element={<PrivateRoute/>}>
                <Route path='/edit-user/:id' element={<EditUser />}/>
            </Route>

            <Route path='/view-user/:id' element={<PrivateRoute/>}>
                <Route path='/view-user/:id' element={<ViewUser />}/>
            </Route>

            <Route path='/redefine-password/:id' element={<PrivateRoute/>}>
                <Route path='/redefine-password/:id' element={<RedefinePassword />}/>
            </Route>

            <Route path='/view-profile' element={<ViewProfile/>}>
                <Route path='/view-profile' element={<ViewProfile />}/>
            </Route>
        </Routes>
    );
}

export default AppRoutes;