import React from 'react';
import axios from 'axios';

export function getBooks(
    limit=10,
    start=0,
    order='asc',
    list=''){

    // const request = `/api/books?skip=${start}&limit=${limit}&order=${order}`;
    const request = axios.get(`/api/books?skip=${start}&limit=${limit}&order=${order}`)
                        .then(response => {

                            if(list){
                                return [...list,...response.data]
                            }
                            else{
                                return response.data
                            }

                        } );

    // console.log(request);

    return{
        type:'GET_BOOKS',
        payload:request
    }

}