import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { FetchUnsentTweetsActionInterface, UnsentTweetActionType } from "./contracts/actionTypes";
import { TweetResponse } from "../../../types/tweet";
import { ScheduledTweetApi } from "../../../services/api/tweet-service/scheduledTweetApi";
import { setUnsentTweets, setUnsentTweetsLoadingState } from "./actionCreators";
import { LoadingStatus } from "../../../types/common";
import { PAGE_TOTAL_COUNT } from "../../../constants/common-constants";

export function* fetchUnsentTweetsRequest({ payload }: FetchUnsentTweetsActionInterface) {
    try {
        yield put(setUnsentTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(ScheduledTweetApi.getScheduledTweets, payload);
        yield put(setUnsentTweets({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (e) {
        yield put(setUnsentTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* unsentTweetsSaga() {
    yield takeLatest(UnsentTweetActionType.FETCH_UNSENT_TWEETS, fetchUnsentTweetsRequest);
}
