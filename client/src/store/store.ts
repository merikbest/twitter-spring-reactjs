import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from "redux-saga";
import {TagsState} from './ducks/tags/contracts/state';
import {TweetsState} from './ducks/tweets/contracts/state';

import {rootReducer} from "./rootReducer";
import rootSaga from "./saga";
import {TweetState} from "./ducks/tweet/contracts/state";

export interface RootState {
    tweets: TweetsState;
    tweet: TweetState;
    tags: TagsState;
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
