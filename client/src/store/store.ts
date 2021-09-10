import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from "redux-saga";

import {rootReducer} from "./rootReducer";
import rootSaga from "./saga";
import {TagsState} from './ducks/tags/contracts/state';
import {TweetsState} from './ducks/tweets/contracts/state';
import {TweetState} from "./ducks/tweet/contracts/state";
import {UserState} from "./ducks/user/contracts/state";
import {UsersState} from "./ducks/users/contracts/state";
import {UserTweetsState} from "./ducks/userTweets/contracts/state";
import {UserProfileState} from "./ducks/userProfile/contracts/state";
import {UsersSearchState} from "./ducks/usersSearch/contracts/state";
import {ChatsState} from "./ducks/chats/contracts/state";
import {ChatMessageState} from "./ducks/chatMessages/contracts/state";
import {NotificationsState} from "./ducks/notifications/contracts/state";
import {ListsState} from "./ducks/lists/contracts/state";
import {ListState} from "./ducks/list/contracts/state";

export interface RootState {
    tweets: TweetsState;
    tweet: TweetState;
    tags: TagsState;
    users: UsersState;
    user: UserState;
    userProfile: UserProfileState;
    userTweets: UserTweetsState;
    usersSearch: UsersSearchState;
    chats: ChatsState;
    chatMessages: ChatMessageState;
    notifications: NotificationsState;
    lists: ListsState;
    list: ListState;
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
