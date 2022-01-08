import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import api from '../config/api';


const ViewProfile = () => {
    const [user, setUser] = useState([]);

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

            await api.get(`viewProfile`, headers)
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
    }, []);

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
                <h1>Detalhes do Usuário</h1>

                {status.type === 'error' ? <p>{status.message}</p> : '' }

                <span>{user.nome}</span>
                <span>{user.email}</span>
            </div>
        </>

    );
}

export default ViewProfile;