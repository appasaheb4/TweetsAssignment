import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all, spawn, call } from 'redux-saga/effects';

// Reducer   
import loginReducer from "./reducers/login";


// Watcher
import { loginWatcher } from "./sagas/login";


const rootSaga = function* () {
    const sagas = [
        // login 
        loginWatcher,

    ];

    yield all(
        sagas.map( saga =>
            spawn( function* () {
                while ( true ) {
                    try {
                        yield call( saga );
                        break;
                    } catch ( e ) {
                        console.log( e );
                    }
                }
            } ),
        ),
    );
};

const rootReducer = combineReducers( {
    login: loginReducer,
} );

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools( applyMiddleware( sagaMiddleware ) ),
);

sagaMiddleware.run( rootSaga );


export {
    store,
};

