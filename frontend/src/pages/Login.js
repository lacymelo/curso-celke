import React, { useState } from "react";

function Login(){

    //inicializa os campos com vazio
    const [ data, setData ] = useState({
        email: '',
        senha: ''
    });

    //atribui para data  o que foi digitado pelo usuário
    const changeInput = e => setData({
        ...data, [e.target.name]: e.target.value
    });

    
    const submitForm = e => {
        e.preventDefault();
        console.log(data);
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={submitForm}>
                <label>Usuário:</label>
                <input type="text" name="email" placeholder=" entre com seu e-mail" onChange={changeInput} />

                <label>Senha:</label>
                <input type="password" name="senha" placeholder="entre com a senha" onChange={changeInput} />

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;