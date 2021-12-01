import React, { useState} from "react";

import '../App.css'

function Menu() {

    const [ data, setData] = useState({
        image: '',
        nome: '',
        email: '',
        senha: '',
    });

    const valorInput = e => setData ({
        ...data, [e.target.name]: e.target.value  
    });

    const inputFile = e => setData ({
        ...data, [e.target.name]: e.target.files[0] 
    });

    const newUser = e => {
        e.preventDefault();
        console.log(data);
    }

    return(
        <body>
            <h1>Cadastrar</h1>
            <form onSubmit={newUser}>
                <label>Nome: </label>
                <input type="text" name="nome" placeholder="digite seu nome" onChange={valorInput} />

                <input type="file" name="image" onChange={inputFile} />

                <label>E-mail: </label>
                <input type="text" name="email" placeholder="digite seu email" onChange={valorInput} />

                <label>Senha: </label>
                <input type="password" name="senha" placeholder="digite sua senha" onChange={valorInput} />

                <button type="submit">Cadastrar</button>
            </form>
        </body>
    );
}

export default Menu;