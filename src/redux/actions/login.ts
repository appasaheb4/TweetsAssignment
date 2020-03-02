// types and action creators: dispatched by components and sagas
export const LOGIN = "LOGIN";

export const onLogin = args => {
    return {
        type: LOGIN,
        ...args
    }
}

// types and action creators (saga): dispatched by saga workers
export const FETCH_LOGIN = "FETCH_LOGIN";

export const fetchLogin = result => {
    return {
        type: FETCH_LOGIN,
        payload: { result }
    }
}
