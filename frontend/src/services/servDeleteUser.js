import React from "react";
import api from "../config/api";

export const servDeleteUser = async (idUser) => {
    var status = false;

    await api.get(`/deleteUser/${idUser}`)
    .then((response) => {
        status = {
            type: 'success',
            message: response.data.message
        }
    }).catch((err) => {
        if(err.response){
            status = {
                type: 'error',
                message: err.response.data.message
            }
        } else {
            status = {
                type: 'error',
                message: 'erro: tente mais tarde!'
            }
        }
    });

    return status;
}