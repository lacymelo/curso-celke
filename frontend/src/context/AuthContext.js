import React, {createContext, useEffect, useState} from "react";

import api from '../config/api';

const Context = createContext();

function AuthProvider({children}){

    const [authenticated, setAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getLogin = async () =>{
            //recuperando o token do localStorage
            const token = localStorage.getItem('token');

            if(token && valUser()){
                //permissão de acesso a api se o token existi
                api.defaults.headers.Authorization = `Bearer ${token}`;

                //passa a ser verdadeiro
                setAuthenticated(true);
            }

            setLoading(false);
        }


        getLogin();
    }, []);

    const valUser = async () => {
        const valueToken = localStorage.getItem('token');

        const headers = { "headers" : {
            'Authorization': 'Bearer ' + valueToken
        }}

        await api.get('/valToken', headers)
        .then(() => {
            return true;
        }).catch(() => {
            setAuthenticated(false);
            localStorage.removeItem('token');
            api.defaults.headers.Authorization = undefined;
            return false;
        });
    }

    if(loading){
        return <h1>Carregando ...</h1>
    }

    async function signIn(){
        setAuthenticated(true);
    }

    //logout do usuário
    function handleLogout(){
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
    }

    return(
        //autenticação compartilhada entre todas as rotas
        <Context.Provider value={{authenticated, signIn, handleLogout}}>
            {children}
        </Context.Provider>
    );
}

export {Context, AuthProvider};