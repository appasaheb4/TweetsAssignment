// types and action creators: dispatched by components and sagas
export const REGISTER = "REGISTER";
export const onRegister = args => {
    return {
        type: REGISTER,
        ...args
    }
}



// types and action creators (saga): dispatched by saga workers
export const FETCH_REGISTER = "FETCH_REGISTER";

export const onFetchRegister = result => {
    return {
        type: FETCH_REGISTER,
        payload: { result }
    }
}