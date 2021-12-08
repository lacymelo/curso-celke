import React, {useContext} from "react";

import {Context} from "../context/AuthContext";

import { Link } from 'react-router-dom';

function Home(){
    const { authenticated, handleLogout } = useContext(Context);

    console.log(authenticated);

    return(
        <div>

            <Link to='/home'>Home</Link><br />
            <Link to='/users'>Users</Link><br />

            <h1>Home</h1>

            <button type="button" onClick={handleLogout}>Sair</button>
        </div>
    );
}

export default Home;