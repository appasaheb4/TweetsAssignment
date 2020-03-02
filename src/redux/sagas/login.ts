import { put, call } from "redux-saga/effects";
import { createWatcher, postUrl } from "../utils/utilities";

import {
    LOGIN,
    fetchLogin
} from "../actions/login";


function* loginWorker( action: any ) {
    const { url, data } = action;
    try {
        console.log( { url, data } );
        let res = yield call( postUrl, url, data );
        res = res.data;
        console.log( { res } );
        yield put( fetchLogin( res ) );
    } catch ( e ) {
        console.log( "error", e );
    }
}

export const loginWatcher = createWatcher(
    loginWorker,
    LOGIN
);