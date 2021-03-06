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

export function getBook(id){
    const request = axios.get(`/api/getBook?id=${id}`)
                    .then(response=>response.data);

    return {
        type:'GET_BOOK',
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
             book:null, //otherwise component will try to render empty object at first attempt which could result in an error. Eg: "TypeError: Cannot read property 'name' of undefined"
             reviewer:{}
         }
    }
}

export function updateBook(data){
    const request = axios.post(`/api/book_update`,data)
                    .then(response=>response.data)
    
    return{
        type:'UPDATE_BOOK',
        payload:request
    }
}

export function deleteBook(id){
    const request = axios.delete(`/api/delete_book?id=${id}`).then(response=>response.data);
    return{
        type:'DELETE_BOOK',
        payload:request
    }
}

export function clearBook(){
    return{
       type:'CLEAR_BOOK', 
       payload: {
            book:null, //otherwise component will try to render empty object at first attempt which could result in an error. Eg: "TypeError: Cannot read property 'name' of undefined"
            updateBook:false,
            postDeleted:false

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

// export function auth(){
//     const request = axios.get('/api/auth').then(response => response.data);
//     return {
//         type:'USER_AUTH',
//         payload:request
//     }
// }

//I have used async/await instead of the above
//https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9
//https://hackernoon.com/javascript-async-await-the-good-part-pitfalls-and-how-to-use-9b759ca21cda
//https://medium.freecodecamp.org/avoiding-the-async-await-hell-c77a0fb71c4c
export const auth =async ()=>{
    const request=await axios.get('/api/auth');
    return {
        type:'USER_LOGIN',
        payload:request.data
    }
}

export function addBook(book){
    const request = axios.post('/api/book',book)
        .then(response=>response.data)
    
        return{
            type:'ADD_BOOK',
            payload:request
        }
}

export function clearNewBook(){
    return {
        type:'CLEAR_NEW_BOOK',
        payload:{}
    }
}


export const getUserPosts = async (id)=>{
    const request=await axios.get(`/api/user_posts?user=${id}`);
    return{
        type:'GET_USER_POSTS',
        payload:request.data
    }

}

export function getUsers(){

    const request = axios.get('/api/users')
                        .then(response=>response.data);

    return {
        type:'GET_USERS',
        payload:request
    }

}

export function userRegister(user, userList){
    const request=axios.post(`/api/register`, user);

    return (dispatch)=>{
        request.then(({data})=>{
            //console.log(data)
            let users = data.success ? [...userList,data.doc] : [...userList]; //to prevent undefined property error. Because and error occured data.doc wouldn't be there.
            let response = {
                success:data.success,
                users
            }

            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })

        
    }

}