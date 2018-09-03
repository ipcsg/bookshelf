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

    const request = axios.get(`/api/getBook?id=${id}`)

    return (dispatch)=>{
        request.then(({data})=>{//destructuing data received from axios.get request
            let book = data;
            //console.log(data)
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
                .then(({data})=>{

                    let response={
                        book,
                        reviewer:data
                    }
                    console.log(response);
                    dispatch({
                        type:'GET_BOOK_W_REVIEWER',
                        payload:response
                    })
                });

        });
    
    }
    
    
}

// export function getBookWithReviewer(id){
//     const request = axios.get(`/api/getBook?id=${id}`)

//     return (dispatch)=>{
//         request.then(({data})=>{
//             let book = data;

//             axios.get(`/api/getReviewer?id=${book.ownerId}`)
//             .then(({data})=>{
//                 let response = {
//                     book,
//                     reviewer:data
//                 }

//                 dispatch({
//                     type:'GET_BOOK_W_REVIEWER',
//                     payload:response
//                 })
//             })
//         })
//     }
// }

export function clearBookWithReviewer(){//clearing store for the component so the article is loaded without displaying the previously loaded article first
    //reference the reducer as well for this
    return {
         type:'CLEAR_BOOK_W_REVIEWER',
         payload:{
             book:{},
             reviewer:{}
         }
    }
}

/*=============== USER======================*/

export function loginUser({email, password})//destructuring
{
    const request = axios.post('/api/login',{email,password})
                    .then(response => response.data);
    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/auth').then(response => response.data);
    return {
        type:'USER_AUTH',
        payload:request
    }
}