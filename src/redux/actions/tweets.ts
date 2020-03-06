// types and action creators: dispatched by components and sagas
export const GET_TWEETS = "GET_TWEETS";
export const ADD_TWEETS = "ADD_TWEETS";
export const DELETE_TWEETS = "DELETE_TWEETS";
export const onGetTweets = args => {
    return {
        type: GET_TWEETS,
        ...args
    }
}

export const onAddTweets = args => {
    return {
        type: ADD_TWEETS,
        ...args
    }
}

export const onDeleteTweets = args => {
    return {
        type: DELETE_TWEETS,
        ...args
    }
}


// types and action creators (saga): dispatched by saga workers
export const FETCH_TWEETS = "FETCH_TWEETS";
export const FETCH_DELETE_TWEETS = "FETCH_DELETE_TWEETS";
export const FETCH_ADD_TWEETS = "FETCH_ADD_TWEETS";


export const onFetchTweets = result => {
    return {
        type: FETCH_TWEETS,
        payload: { result }
    }
}

export const onFetchDeleteTweets = result => {
    return {
        type: FETCH_DELETE_TWEETS,
        payload: { result }
    }
}

export const onFetchAddTweets = result => {
    return {
        type: FETCH_ADD_TWEETS,
        payload: { result }
    }
}