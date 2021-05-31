import {call, put, takeLatest} from 'redux-saga/effects';

import {setAddFormState, setTweets, setTweetsLoadingState} from "./actionCreators";
import {TweetsApi} from "../../../services/api/tweetsApi";
import {AddFormState, LoadingState, Tweet, TweetsState} from "./contracts/state";
import {FetchAddTweetActionInterface, TweetsActionType} from "./contracts/actionTypes";

export function* fetchTweetsRequest() {
    try {
        const items: TweetsState["items"] = yield call(TweetsApi.fetchTweets);
        yield put(setTweets(items));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingState.ERROR));
    }
}

export function* fetchAddTweetRequest({payload}: FetchAddTweetActionInterface) {
    try {
        const data: Tweet = {
            _id: Math.random().toString(36).substring(2),
            text: payload,
            user: {
                fullname: "Vbhjckfd1",
                username: "Vbhjckfd1",
                avatarUrl: "https://avatars.githubusercontent.com/u/56604599?v=4"
            }
        };

        const item: Tweet[] = yield call(TweetsApi.addTweet, data);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setAddFormState(AddFormState.ERROR));
    }
}

export function* tweetsSaga() {
    yield takeLatest(TweetsActionType.FETCH_TWEETS, fetchTweetsRequest);
    yield takeLatest(TweetsActionType.FETCH_ADD_TWEET, fetchAddTweetRequest);
}
