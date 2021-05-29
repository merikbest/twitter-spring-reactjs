import {setTweets, setTweetsLoadingState, TweetsActionType} from "./actionCreators";
import {call, put, takeLatest} from 'redux-saga/effects';
import {TweetsApi} from "../../../services/api/tweetsApi";
import {LoadingState, TweetsState} from "./contracts/state";

export function* fetchTweetsRequest() {
    try {
        const items: TweetsState["items"] = yield call(TweetsApi.fetchTweets);
        yield put(setTweets(items));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingState.ERROR));
    }
}

export function* tweetsSaga() {
    yield takeLatest(TweetsActionType.FETCH_TWEETS, fetchTweetsRequest);
}
