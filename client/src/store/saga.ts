import {all} from "redux-saga/effects";

import {tweetsSaga} from "./ducks/tweets/sagas";
import {tagsSaga} from "./ducks/tags/sagas";
import {tweetSaga} from "./ducks/tweet/sagas";
import {usersSaga} from "./ducks/users/sagas";
import {userSaga} from "./ducks/user/sagas";

export default function* rootSaga() {
    yield all([tweetsSaga(), tweetSaga(), tagsSaga(), usersSaga(), userSaga()])
}
