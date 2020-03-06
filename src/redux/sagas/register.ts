import { put, call } from "redux-saga/effects";
import { createWatcher, postUrl } from "../utils/utilities";

import {
    REGISTER,
    onFetchRegister
} from "../actions/register";


function* registerWorker( action: any ) {
    const { url, data } = action;
    try {
        console.log( { url, data } );
        let res = yield call( postUrl, url, data );
        res = res.data;
        console.log( { res } );
        yield put( onFetchRegister( res ) );
    } catch ( e ) {
        console.log( "error", e );
    }
}

export const registerWatcher = createWatcher(
    registerWorker,
    REGISTER
);