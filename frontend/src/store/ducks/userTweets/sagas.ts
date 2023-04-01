import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { setUserTweets, setUserTweetsLoadingStatus } from "./actionCreators";
import {
    FetchUserLikedTweetsActionInterface,
    FetchUserMediaTweetsActionInterface,
    FetchUserRetweetsAndRepliesActionInterface,
    FetchUserTweetsActionInterface,
    UserTweetsActionType
} from "./contracts/actionTypes";
import { TweetResponse } from "../../../types/tweet";
import { LoadingStatus } from "../../../types/common";
import { PAGE_TOTAL_COUNT } from "../../../constants/common-constants";
import { LikeTweetApi } from "../../../services/api/tweet-service/likeTweetApi";
import { RetweetApi } from "../../../services/api/tweet-service/retweetApi";
import { TweetApi } from "../../../services/api/tweet-service/tweetApi";

export function* fetchUserTweetsRequest({ payload }: FetchUserTweetsActionInterface) {
    try {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(TweetApi.getUserTweets, payload);
        yield put(setUserTweets({ items: response.data, pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT]) }));
    } catch (e) {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserLikedTweetsRequest({ payload }: FetchUserLikedTweetsActionInterface) {
    try {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(LikeTweetApi.getUserLikedTweets, payload);
        yield put(setUserTweets({ items: response.data, pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT]) }));
    } catch (e) {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserMediaTweetsRequest({ payload }: FetchUserMediaTweetsActionInterface) {
    try {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(TweetApi.getUserMediaTweets, payload);
        yield put(setUserTweets({ items: response.data, pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT]) }));
    } catch (e) {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserRetweetsAndRepliesRequest({ payload }: FetchUserRetweetsAndRepliesActionInterface) {
    try {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(RetweetApi.getUserRetweetsAndReplies, payload);
        yield put(setUserTweets({ items: response.data, pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT]) }));
    } catch (e) {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* userTweetsSaga() {
    yield takeLatest(UserTweetsActionType.FETCH_TWEETS, fetchUserTweetsRequest);
    yield takeLatest(UserTweetsActionType.FETCH_LIKED_TWEETS, fetchUserLikedTweetsRequest);
    yield takeLatest(UserTweetsActionType.FETCH_MEDIA_TWEETS, fetchUserMediaTweetsRequest);
    yield takeLatest(UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES, fetchUserRetweetsAndRepliesRequest);
}
