import {
    FETCH_TWEETS,
    FETCH_ADD_TWEETS,
    FETCH_DELETE_TWEETS
} from "../actions/tweets";

const initialState = {
    resTweets: { loading: false },
    resAddTweets: { loading: false },
    resDeleteTweets: { loading: false }
};


export default ( state = initialState, action: any ) => {
    switch ( action.type ) {
        case FETCH_TWEETS:
            return {
                ...state,
                resTweets: {
                    loading: true,
                    ...action.payload.result
                }
            };
        case FETCH_ADD_TWEETS:
            return {
                ...state,
                resAddTweets: {
                    loading: true,
                    ...action.payload.result
                }
            };
        case FETCH_DELETE_TWEETS:
            return {
                ...state,
                resDeleteTweets: {
                    loading: true,
                    ...action.payload.result
                }
            }
        default:
            return state;
    }
};

