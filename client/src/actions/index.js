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


export function getBookWithReviewer(id){

    const request = axios.get(`/api/getBook?id=${id}`);

    return (dispatch)=>{
        request.then(({data})=>{//destructuing data received from axios.get request
            let book = data;
            
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
                .then(({data})=>{

                    let response={
                        book,
                        reviewer:data
                    }
                    console.log(response);
                    return{
                        type:'GET_BOOK_W_REVIEWER',
                        payload:response
                    }
                });

        });
    
    }
    
    
}