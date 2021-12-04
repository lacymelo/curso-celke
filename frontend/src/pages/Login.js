import React, { useState , useContext } from "react";

import { useNavigate } from 'react-router-dom';

import api from '../config/api';

import {Context} from '../context/AuthContext';

function Login(){

    const navigate = useNavigate();

    const authenticated = useContext(Context);

    console.log(authenticated);

    //inicializa os campos com vazio
    const [ data, setData ] = useState({
        email: '',
        senha: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: '',
        loading: false
    });

    //atribui para data  o que foi digitado pelo usuário
    const changeInput = e => setData({
        ...data, [e.target.name]: e.target.value
    });


    const submitForm = e => {
        e.preventDefault();

        setStatus({
            loading: true
        });

        api.post('/login', data)
        .then((response) => {
            setStatus({
                // type: 'success',
                // message: response.data.message,
                loading: false
            });
            localStorage.setItem('token', JSON.stringify(response.data.token));
            return navigate('/home');
        }).catch((err) => {
            if(err.response){
                setStatus({
                    type: 'error',
                    message: err.response.data.message,
                    loading: false
                });
            } else {
                console.log('erro: tente mains tarde!');
            }
        });
    }

    return(
        <div>
            <h1>Login</h1>
            {status.type === 'error' ? <p>{status.message}</p> : <p>{status.message}</p>}
            <form onSubmit={submitForm}>
                <label>Usuário:</label>
                <input type="text" name="email" placeholder=" entre com seu e-mail" onChange={changeInput} />

                <label>Senha:</label>
                <input type="password" name="senha" placeholder="entre com a senha" onChange={changeInput} />

                {status.loading ? <button type="submit" disabled>Acessando ...</button> : <button type="submit">Entrar</button>}
            </form>
        </div>
    );
}

export default Login;