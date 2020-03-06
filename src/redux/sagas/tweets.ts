import { put, call } from "redux-saga/effects";
import { createWatcher, postUrl, getUrl } from "../utils/utilities";

import {
    GET_TWEETS,
    onFetchTweets,
    ADD_TWEETS,
    onFetchAddTweets,
    DELETE_TWEETS,
    onFetchDeleteTweets
} from "../actions/tweets";


function* getTweetsWorker( action: any ) {
    const { url } = action;
    try {
        console.log( { url } );
        let res = yield call( getUrl, url );
        res = res.data;
        console.log( { res } );
        yield put( onFetchTweets( res ) );
    } catch ( e ) {
        console.log( "error", e );
    }
}

export const getTweetsWatcher = createWatcher(
    getTweetsWorker,
    GET_TWEETS
);

function* addTweetWorker( action: any ) {
    const { url, data } = action;
    try {
        console.log( { url, data } );
        let res = yield call( postUrl, url, data );
        res = res.data;
        console.log( { res } );
        yield put( onFetchAddTweets( res ) );
    } catch ( e ) {
        console.log( "error", e );
    }
}

export const addTweetsWatcher = createWatcher(
    addTweetWorker,
    ADD_TWEETS
);

function* deleteTweetWorker( action: any ) {
    const { url, data } = action;
    try {
        console.log( { url, data } );
        let res = yield call( postUrl, url, data );
        res = res.data;
        console.log( { res } );
        yield put( onFetchDeleteTweets( res ) );
    } catch ( e ) {
        console.log( "error", e );
    }
}

export const deleteTweetWatcher = createWatcher(
    deleteTweetWorker,
    DELETE_TWEETS
);