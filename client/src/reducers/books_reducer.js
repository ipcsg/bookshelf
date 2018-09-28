//import { STATES } from "mongoose";//????

export default function(state={},action){

    switch(action.type){

        case 'GET_BOOKS':
            return {...state,list:action.payload}//existing state and the data derived from the action
        
        case 'GET_BOOK':
            return {
                ...state,//existing state
                book:action.payload
            }
        case 'GET_BOOK_W_REVIEWER':
            return {...state,//existing state
                book:action.payload.book,
                reviewer:action.payload.reviewer
            }
        case 'CLEAR_BOOK_W_REVIEWER':
            return{
                ...state,//existing state
                book:action.payload.book,
                reviewer:action.payload.reviewer
            }
        case 'ADD_BOOK':
            return{
                ...state,//existing state
            newbook:action.payload
            }
            case 'UPDATE_BOOK':
            return {
                ...state,//existing state
                updateBook:action.payload.success,
                book:action.payload.doc
            }
        case 'CLEAR_NEW_BOOK':
            return{
                ...state,//existing state
            newbook:action.payload
            }
        case 'DELETE_BOOK':
            return{
                ...state,//existing state
                postDeleted:action.payload
            }
        case 'CLEAR_BOOK':
            return{
                ...state,
                updateBook:action.payload.updateBook,
                postDeleted:action.payload.postDeleted
            }
        default:
            return state;
    }


}