import {AxiosResponse} from "axios";
import {call, put, takeLatest} from "redux-saga/effects";

import {FetchUnsentTweetsActionInterface, UnsentTweetActionType} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {TweetResponse} from "../../types/tweet";
import {TweetApi} from "../../../services/api/tweetApi";
import {setUnsentTweets, setUnsentTweetsLoadingState} from "./actionCreators";

export function* fetchUnsentTweetsRequest({payload}: FetchUnsentTweetsActionInterface) {
    try {
        yield put(setUnsentTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(TweetApi.fetchScheduledTweets, payload);
        yield put(setUnsentTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (e) {
        yield put(setUnsentTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* unsentTweetsSaga() {
    yield takeLatest(UnsentTweetActionType.FETCH_UNSENT_TWEETS, fetchUnsentTweetsRequest);
}
