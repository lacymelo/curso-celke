import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { servDeleteUser } from '../services/servDeleteUser';

import api from '../config/api';
import Menu from '../components/Menu';

const ViewUser = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const { id } = useParams();

    const [status, setStatus] = useState({
        type: '',
        message: '',
    });

    useEffect(() => {
        async function loadUser(){
            const headers = {
                'headers': {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            }

            await api.get(`/user/${id}`, headers)
            .then((response) => {
                if(response.data){
                    setUser(response.data);
                }else{
                    setStatus({
                        type: 'error',
                        message: 'Erro: tente mais tarde!'
                    });
                }
            }).catch((err) => {
                if(err.response){
                    setStatus({
                        type: 'error',
                        message: err.response.data.message
                    });
                }else{
                    setStatus({
                        type: 'error',
                        message: 'Erro: tente mais tarde!'
                    });
                }
            });
        }

        loadUser();
    }, [id]);

    async function handleDelete(id){
        const response = await servDeleteUser(id);

        return navigate('/users', {
            state: {
                type: response.type,
                message: response.message
            }
        });
    }

    return(
        <>        
            <Menu/>

            <div className="user-list">
                <Link to={'/edit-user/' + user.id}>
                    <button type='button'>Editar</button>
                </Link>
                <Link to={'/redefine-password/' + user.id}>
                    <button type='button'>Redefinir Senha</button>
                </Link>
                <Link to={'#'}>
                    <button type='button' onClick={() => handleDelete(user.id)}>Apagar</button>
                </Link>
                <h1>Detalhes do Usuário</h1>

                {status.type === 'error' ? <p>{status.message}</p> : '' }

                <span>{user.nome}</span>
                <span>{user.email}</span>
            </div>
        </>

    );
}

export default ViewUser;