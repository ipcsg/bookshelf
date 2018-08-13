export default function(state={},action){

    switch(action.type){

        case 'GET_BOOKS':
            return {...state,list:action.payload}//existing state and the data derived from the action
        default:
            return state;
    }


}