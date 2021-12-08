import React, { useState }  from "react";

import { useNavigate } from "react-router-dom";

import api from '../config/api';

export default function New(){

    const navigate = useNavigate();

    const [data, setData] = useState({
        nome: '',
        email: '',
        senha: '',
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const handleInput = e => setData({
        ...data, [e.target.name]: e.target.value
    });

    async function handleSubmit(event){
        event.preventDefault();

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.post('/new', data, headers)
        .then((response) => {
            navigate({
                pathname: '/users',
                state: {
                    type: 'success',
                    message: response.message
                }
            });
        }).catch((err) => {
            if(err.response){
                setStatus({
                    type: 'error',
                    message: err.response.message
                });
            }else{
                setStatus({
                    type: 'error',
                    message: 'Erro: tente mais tarde!'
                });
            }
        });

    }

    return(
        <>
            <h1>Novo Usuário</h1>

            {status.type === 'error' ? <p>{status.message}</p> : ''}

            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome* </label>
                <input type="text" name="nome" id="nome" onChange={handleInput} /><br/>

                <label htmlFor="email">Email* </label>
                <input type="text" name="email" id="email" onChange={handleInput} /><br/>

                <label htmlFor="senha">Senha* </label>
                <input type="password" name="senha" id="senha" onChange={handleInput} /><br/>

                <button type="submit">Cadastrar</button>
            </form>
        </>

    );
}