import {
    FETCH_LOGIN
} from "../actions/login";



const initialState = {
    resLogin: { loading: false }
};


export default ( state = initialState, action: any ) => {
    switch ( action.type ) {
        case FETCH_LOGIN:
            return {
                ...state,
                resLogin: {
                    loading: true,
                    ...action.payload.result
                }
            };
        default:
            return state;
    }
};