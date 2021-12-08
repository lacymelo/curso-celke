import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import api from '../config/api';

export default function Users(){

    const { state } = useLocation();

    const [user, setUser] = useState([]);

    const [status, setStatus] = useState({
        type: state ? state.type : '',
        message: state ? state.message : '',
    });

    async function listUser(){

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get('users', headers)
        .then((response) => {
            setUser(response.data);
        }).catch((err) => {
            if(err.response){
                setStatus({
                    type: 'error',
                    message: err.response.data.message
                });
            } else {
                setStatus({
                    type: 'error',
                    message: 'erro: tente mais tarde!'
                });
            }
        });
    }

    useEffect(() => {
        listUser();
    }, []);

    return(
        <>
            <Link to='/home'>Home</Link><br />
            <Link to='/users'>Users</Link><br />

            <div className="user-list">
                <Link to='/new'>
                    <button>Novo usuário</button>
                </Link>
                <h1>Lista de usuários</h1>

                {status.type === 'error' ? <p>{status.message}</p> : ''}

                {
                    user.map(user => (
                        <div key={user.id}>
                            <span>{user.nome}</span><br />
                            <span>{user.email}</span><br />
                        </div>
                    ))
                }
            </div>
        </>
    );
}