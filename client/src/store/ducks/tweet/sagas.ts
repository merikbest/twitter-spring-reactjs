import {call, put, takeEvery} from 'redux-saga/effects';

import {TweetApi} from "../../../services/api/tweetApi";
import {
    AddTweetToBookmarksActionInterface,
    DeleteTweetReplyActionInterface,
    FetchReplyTweetActionInterface,
    FetchTweetDataActionInterface,
    TweetActionType
} from "./contracts/actionTypes";
import {setBookmarkedTweet, setTweetData, setTweetLoadingState} from './actionCreators';
import {LoadingStatus} from '../../types';
import {TweetResponse} from "../../types/tweet";
import {setUserLoadingStatus} from "../user/actionCreators";
import {UserApi} from "../../../services/api/userApi";

export function* fetchTweetDataRequest({payload: tweetId}: FetchTweetDataActionInterface) { // +
    try {
        yield put(setTweetLoadingState(LoadingStatus.LOADING));
        const data: TweetResponse = yield call(TweetApi.fetchTweetData, tweetId);
        yield put(setTweetData(data));
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* addTweetToBookmarksRequest({payload}: AddTweetToBookmarksActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: boolean = yield call(UserApi.addTweetToBookmarks, payload);
        yield put(setBookmarkedTweet(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchReplyTweetRequest({payload}: FetchReplyTweetActionInterface) { // +
    try {
        yield call(TweetApi.replyTweet, payload);
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* deleteTweetReplyRequest({payload}: DeleteTweetReplyActionInterface) { // +
    try {
        yield call(TweetApi.deleteTweet, payload);
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* tweetSaga() {
    yield takeEvery(TweetActionType.FETCH_TWEET_DATA, fetchTweetDataRequest); // +
    yield takeEvery(TweetActionType.ADD_TWEET_TO_BOOKMARKS, addTweetToBookmarksRequest); // +
    yield takeEvery(TweetActionType.FETCH_REPLY_TWEET, fetchReplyTweetRequest); // +
    yield takeEvery(TweetActionType.DELETE_TWEET_REPLY, deleteTweetReplyRequest); // +
}
