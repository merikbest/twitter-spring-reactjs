import {call, put, takeLatest} from 'redux-saga/effects';

import {setUserTweets, setUserTweetsLoadingStatus} from "./actionCreators";
import {Tweet} from "./contracts/state";
import {
    FetchUserLikedTweetsActionInterface, FetchUserMediaTweetsActionInterface,
    FetchUserTweetsActionInterface,
    UserTweetsActionType
} from "./contracts/actionTypes";
import {LoadingStatus} from '../../types';
import {UserApi} from "../../../services/api/userApi";

export function* fetchUserTweetsRequest({payload}: FetchUserTweetsActionInterface) {
    try {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.LOADING));
        const items: Tweet[] = yield call(UserApi.getUserTweets, payload);
        yield put(setUserTweets(items));
    } catch (e) {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserLikedTweetsRequest({payload}: FetchUserLikedTweetsActionInterface) {
    try {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.LOADING));
        const items: Tweet[] = yield call(UserApi.getUserLikedTweets, payload);
        yield put(setUserTweets(items));
    } catch (e) {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserMediaTweetsRequest({payload}: FetchUserMediaTweetsActionInterface) {
    try {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.LOADING));
        const items: Tweet[] = yield call(UserApi.getUserMediaTweets, payload);
        yield put(setUserTweets(items));
    } catch (e) {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* userTweetsSaga() {
    yield takeLatest(UserTweetsActionType.FETCH_TWEETS, fetchUserTweetsRequest);
    yield takeLatest(UserTweetsActionType.FETCH_LIKED_TWEETS, fetchUserLikedTweetsRequest);
    yield takeLatest(UserTweetsActionType.FETCH_MEDIA_TWEETS, fetchUserMediaTweetsRequest);
}
