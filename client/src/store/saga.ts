import {all} from "redux-saga/effects";

import {tweetsSaga} from "./ducks/tweets/sagas";
import {tagsSaga} from "./ducks/tags/sagas";
import {tweetSaga} from "./ducks/tweet/sagas";
import {usersSaga} from "./ducks/users/sagas";
import {userSaga} from "./ducks/user/sagas";
import {userTweetsSaga} from "./ducks/userTweets/sagas";
import {userProfileSaga} from "./ducks/userProfile/sagas";
import {usersSearchSaga} from "./ducks/usersSearch/sagas";
import {chatsSaga} from "./ducks/chats/sagas";
import {chatMessagesSaga} from "./ducks/chatMessages/sagas";
import {notificationsSaga} from "./ducks/notifications/sagas";
import {listsSaga} from "./ducks/lists/sagas";
import {listSaga} from "./ducks/list/sagas";

export default function* rootSaga() {
    yield all([tweetsSaga(), tweetSaga(), tagsSaga(), usersSaga(), userSaga(), userTweetsSaga(), userProfileSaga(),
        usersSearchSaga(), chatsSaga(), chatMessagesSaga(), notificationsSaga(), listsSaga(), listSaga()])
}
