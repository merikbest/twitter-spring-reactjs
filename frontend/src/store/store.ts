import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./rootReducer";
import rootSaga from "./saga";
import { TagsState } from "./ducks/tags/contracts/state";
import { TweetsState } from "./ducks/tweets/contracts/state";
import { TweetState } from "./ducks/tweet/contracts/state";
import { UserState } from "./ducks/user/contracts/state";
import { UsersState } from "./ducks/users/contracts/state";
import { UserTweetsState } from "./ducks/userTweets/contracts/state";
import { UserProfileState } from "./ducks/userProfile/contracts/state";
import { UsersSearchState } from "./ducks/usersSearch/contracts/state";
import { ChatsState } from "./ducks/chats/contracts/state";
import { ChatMessageState } from "./ducks/chatMessages/contracts/state";
import { NotificationsState } from "./ducks/notifications/contracts/state";
import { ListsState } from "./ducks/lists/contracts/state";
import { ListState } from "./ducks/list/contracts/state";
import { FollowerRequestsState } from "./ducks/followerRequests/contracts/state";
import { BlockedAndMutedUsersState } from "./ducks/blockedAndMutedUsers/contracts/state";
import { ListMembersState } from "./ducks/listMembers/contracts/state";
import { UserDetailState } from "./ducks/userDetail/contracts/state";
import { ListDetailState } from "./ducks/listDetail/contracts/state";
import { UnsentTweetsState } from "./ducks/unsentTweets/contracts/state";
import { ActionSnackbarState } from "./ducks/actionSnackbar/contracts/state";
import { TweetAdditionalInfoState } from "./ducks/tweetAdditionalInfo/contracts/state";
import { ChatState } from "./ducks/chat/contracts/state";
import { TopicsState } from "./ducks/topics/contracts/state";
import { SearchState } from "./ducks/search/contracts/state";
import { AddTweetFormState } from "./ducks/addTweetForm/constants/state";
import { AuthenticationState } from "./ducks/authentication/constants/state";

export interface RootState {
    tweets: TweetsState;
    tweet: TweetState;
    tags: TagsState;
    topics: TopicsState;
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
    followerRequests: FollowerRequestsState;
    blockedAndMutedUsers: BlockedAndMutedUsersState;
    listMembers: ListMembersState;
    userDetail: UserDetailState;
    listDetail: ListDetailState;
    unsentTweets: UnsentTweetsState;
    actionSnackbar: ActionSnackbarState;
    tweetAdditionalInfo: TweetAdditionalInfoState;
    chat: ChatState;
    search: SearchState;
    addTweetForm: AddTweetFormState;
    authentication: AuthenticationState;
}

const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
