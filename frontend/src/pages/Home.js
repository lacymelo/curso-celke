import React, {useContext} from "react";

import {Context} from "../context/AuthContext";

function Home(){

    const token = localStorage.getItem('token');

    const authenticated = useContext(Context);

    console.log(authenticated);

    return(
        <div>
            <h1>Home</h1>
            <p>Token: {token}</p>
        </div>
    );
}

export default Home;