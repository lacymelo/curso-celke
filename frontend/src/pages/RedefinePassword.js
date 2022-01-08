import React, { useState}  from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from '../config/api';
import * as yup from 'yup';
import Menu from "../components/Menu";

export default function RedefinePassword(){

    const { id } = useParams();
    const [senha, setSenha] = useState(''); 

    const navigate = useNavigate();

    const [status, setStatus] = useState({
        type: '',
        message: '',
    });

    async function handleSubmit(event){
        event.preventDefault();

        if(!(await validate())) return;

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.put('/redefinePassword', {
            id,
            senha
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

    async function validate(){
        let schema = yup.object().shape({
            senha: yup.string("Error: Campo senha obrigatório!").required('Error: Campo senha obrigatório!')
        });

        try{
            await schema.validate({
                senha
            });

            return true;
        }catch (err){
            setStatus({
                type: 'error',
                message: err.errors[0]
            });
            return false;
        }
    }

    return(
        <>
            <Menu/>
            <h1>Redefinir Senha</h1>

            {status.type === 'error' ? <p>{status.message}</p> : ''}

            <form onSubmit={handleSubmit}>

                <label htmlFor="senha">Senha* </label>
                <input type="password" name="senha" id="senha" placeholder="******" onChange={(e) => setSenha(e.target.value)} /><br/>
                <button type="submit">Salvar</button>
            </form>
        </>

    );
}