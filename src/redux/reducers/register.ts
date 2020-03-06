import {
    FETCH_REGISTER
} from "../actions/register";

const initialState = {
    resRegister: { loading: false }
};


export default ( state = initialState, action: any ) => {
    switch ( action.type ) {
        case FETCH_REGISTER:
            return {
                ...state,
                resRegister: {
                    loading: true,
                    ...action.payload.result
                }
            };
        default:
            return state;
    }
};

