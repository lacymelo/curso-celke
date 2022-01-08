import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { servDeleteUser } from "../services/servDeleteUser";

import api from '../config/api';
import Menu from "../components/Menu";

export default function Users(){
    const location = useLocation();
    const { state } = location;

    const [user, setUser] = useState([]);
    const [page, setPage] = useState('');
    const [lastPage, setLastPage] = useState('');

    const [status, setStatus] = useState({
        type: state ? state.type : '',
        message: state ? state.message : '',
    });

    async function listUser(numPage = 1){

        if(numPage !== undefined){
            setPage(numPage);
        }

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get(`/users/${numPage}`, headers)
        .then((response) => {
            setUser(response.data.users);
            setLastPage(response.data.lastPage);
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

    async function handleDelete(id){
        const response = await servDeleteUser(id);

        if(response.type === 'success'){
            listUser();
        }

        setStatus({
            type: response.type,
            message: response.message
        });
    }

    useEffect(() => {
        listUser();
    }, []);

    return(
        <>

            <Menu/>

            <div className="user-list">
                <Link to='/new'>
                    <button>Novo usuário</button>
                </Link>
                <h1>Lista de usuários</h1>

                {status.type === 'error' ? <p>{status.message}</p> : ''}
                {status.type === 'success' ? <p>{status.message}</p> : ''}

                {
                    user.map(user => (
                        <div key={user.id}>
                            <span>{user.nome}</span><br />
                            <span>{user.email}</span><br />
                            <Link to={"/view-user/" + user.id}>
                                <button type="button" className="btn btn-outline-primary">Visualizar</button>
                            </Link>
                            <Link to={"/edit-user/" + user.id}>
                                <button type="button" className="btn btn-outline-primary">Editar</button>
                            </Link>
                            <button type="button" onClick={() => handleDelete(user.id)} className="btn btn-outline-primary">Apagar</button>
                        </div>
                    ))
                }

                {page !== 1 ? <button type="button" onClick={() => listUser(1)}>Primeira</button> : <button type="button" disabled>Primeira</button> }
                {page !== 1 ? <button type="button" onClick={() => listUser(page - 1)}>{page - 1}</button> : ''}
                <button type="button" disabled>{page}</button>
                {page + 1 <= lastPage ? <button type="button" onClick={() => listUser(page + 1)}>{page + 1}</button> : ''}
                {page !== lastPage ? <button type="button" onClick={() => listUser(lastPage - 1)}>Última</button> : <button type="button" disabled>Última</button>  }
            </div>
        </>
    );
}