import {call, put, takeLatest} from 'redux-saga/effects';

import {addTweet, setAddFormState, setTweets, setTweetsLoadingState} from "./actionCreators";
import {TweetsApi} from "../../../services/api/tweetsApi";
import {AddFormState, LoadingState, Tweet} from "./contracts/state";
import {FetchAddTweetActionInterface, TweetsActionType} from "./contracts/actionTypes";

export function* fetchTweetsRequest() {
    try {
        const items: Tweet[] = yield call(TweetsApi.fetchTweets);
        yield put(setTweets(items));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingState.ERROR));
    }
}

export function* fetchAddTweetRequest({payload: text}: FetchAddTweetActionInterface) {
    try {
        const item: Tweet[] = yield call(TweetsApi.addTweet, text);
        yield put(addTweet(item));
    } catch (e) {
        yield put(setAddFormState(AddFormState.ERROR));
    }
}

export function* tweetsSaga() {
    yield takeLatest(TweetsActionType.FETCH_TWEETS, fetchTweetsRequest);
    yield takeLatest(TweetsActionType.FETCH_ADD_TWEET, fetchAddTweetRequest);
}
