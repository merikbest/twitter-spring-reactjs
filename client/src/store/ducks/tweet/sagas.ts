import {call, put, takeEvery} from 'redux-saga/effects';

import {TweetApi} from "../../../services/api/tweetApi";
import {
    DeleteTweetReplyActionInterface,
    FetchReplyTweetActionInterface,
    FetchTweetDataActionInterface,
    TweetActionType
} from "./contracts/actionTypes";
import {setTweetData, setTweetLoadingState} from './actionCreators';
import {LoadingStatus} from '../../types';
import {TweetResponse} from "../../types/tweet";

export function* fetchTweetDataRequest({payload: tweetId}: FetchTweetDataActionInterface) { // +
    try {
        yield put(setTweetLoadingState(LoadingStatus.LOADING));
        const data: TweetResponse = yield call(TweetApi.fetchTweetData, tweetId);
        yield put(setTweetData(data));
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchReplyTweetRequest({payload}: FetchReplyTweetActionInterface) {
    try {
        yield call(TweetApi.replyTweet, payload);
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* deleteTweetReplyRequest({payload}: DeleteTweetReplyActionInterface) {
    try {
        yield call(TweetApi.deleteTweet, payload);
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* tweetSaga() {
    yield takeEvery(TweetActionType.FETCH_TWEET_DATA, fetchTweetDataRequest); // +
    yield takeEvery(TweetActionType.FETCH_REPLY_TWEET, fetchReplyTweetRequest);
    yield takeEvery(TweetActionType.DELETE_TWEET_REPLY, deleteTweetReplyRequest);
}
