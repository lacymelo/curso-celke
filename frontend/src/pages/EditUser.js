import React, { useState, useEffect }  from "react";

import { useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu";

import api from '../config/api';

export default function EditUser(){

    const { id } = useParams();
    const [nome, setNome] = useState(''); 
    const [email, setEmail] = useState(''); 

    const navigate = useNavigate();

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
                    setNome(response.data.nome);
                    setEmail(response.data.email);
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

    async function handleSubmit(event){
        event.preventDefault();

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.put('/user', {
            id,
            nome,
            email
        }, headers)
        .then((response) => {
            return navigate('/users', {
                state: {
                    type: 'success',
                    message: response.data.message
                }
            });
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

    return(
        <>
            <Menu/>
            <h1>Novo Usuário</h1>

            {status.type === 'error' ? <p>{status.message}</p> : ''}

            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome* </label>
                <input type="text" name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} /><br/>

                <label htmlFor="email">Email* </label>
                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>

                <button type="submit">Salvar</button>
            </form>
        </>

    );
}