import React, { useContext } from "react";
import { Route, useNavigate } from 'react-router-dom';
import { Context } from '../context/AuthContext';

function CustomRoute({ isPrivate, ...rest }) {
    const navigate = useNavigate();
    const { authenticated } = useContext(Context);

    if(isPrivate && authenticated){
        return navigate('/');
    }

    return <Route { ...rest} />
}

export default CustomRoute;
