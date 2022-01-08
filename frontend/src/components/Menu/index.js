import React, { useContext } from "react";
import {Context} from "../../context/AuthContext";
import { Link } from 'react-router-dom';

const Menu = () => {

    const { authenticated, handleLogout } = useContext(Context);

    return(
        <>
            <div>
                <Link to='/home'>Home</Link><br />
                <Link to='/users'>Users</Link><br />
                <Link to='/view-profile'>Meu Perfil</Link><br />
            </div>

            <button type="button" onClick={handleLogout}>Sair</button>
        </>
    );
}

export default Menu;