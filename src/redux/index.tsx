import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all, spawn, call } from 'redux-saga/effects';

// Reducer   
import loginReducer from "./reducers/login";
import registerReducer from "./reducers/register";


// Watcher
import { loginWatcher } from "./sagas/login";
import { registerWatcher } from "./sagas/register";


const rootSaga = function* () {
    const sagas = [
        loginWatcher,
        registerWatcher
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
    register: registerReducer
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

