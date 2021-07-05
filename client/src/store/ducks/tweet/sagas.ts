import {call, put, takeEvery} from 'redux-saga/effects';

import {TweetApi} from "../../../services/api/tweetApi";
import {FetchReplyTweetActionInterface, FetchTweetDataActionInterface, TweetActionType} from "./contracts/actionTypes";
import {Tweet} from '../tweets/contracts/state';
import {setTweetData, setTweetLoadingState} from './actionCreators';
import {LoadingStatus} from '../../types';

export function* fetchTweetDataRequest({payload: tweetId}: FetchTweetDataActionInterface) {
    try {
        const data: Tweet = yield call(TweetApi.fetchTweetData, tweetId);
        yield put(setTweetData(data));
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchReplyTweetRequest({payload}: FetchReplyTweetActionInterface) {
    try {
        const data: Tweet = yield call(TweetApi.replyTweet, payload);
        yield put(setTweetData(data));
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* tweetSaga() {
    yield takeEvery(TweetActionType.FETCH_TWEET_DATA, fetchTweetDataRequest);
    yield takeEvery(TweetActionType.FETCH_REPLY_TWEET, fetchReplyTweetRequest);
}
