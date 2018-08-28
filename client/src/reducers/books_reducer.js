export default function(state={},action){

    switch(action.type){

        case 'GET_BOOKS':
            return {...state,list:action.payload}//existing state and the data derived from the action
        case 'GET_BOOK_W_REVIEWER':
            return {...state,
                book:action.payload.book,
                reviewer:action.payload.reviewer
            }
        default:
            return state;
    }


}