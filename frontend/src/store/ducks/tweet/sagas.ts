import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import {
    AddTweetToBookmarksActionInterface,
    DeleteTweetReplyActionInterface,
    FetchLikedUsersActionInterface,
    FetchRepliesActionInterface,
    FetchReplyTweetActionInterface,
    FetchRetweetedUsersActionInterface,
    FetchTaggedImageUsersActionInterface,
    FetchTweetDataActionInterface,
    TweetActionType
} from "./contracts/actionTypes";
import {
    setBookmarkedTweet,
    setErrorMessage,
    setLikedUsers,
    setLikedUsersLoadingState,
    setReplies,
    setRepliesLoadingState,
    setRetweetedUsers,
    setRetweetedUsersLoadingState,
    setTaggedImageUsers,
    setTaggedImageUsersLoadingState,
    setTweetData,
    setTweetLoadingState
} from "./actionCreators";
import { TweetResponse } from "../../../types/tweet";
import { UserResponse } from "../../../types/user";
import { deleteTweet, setUpdatedBookmarkedTweetTweetsState } from "../tweets/actionCreators";
import { deleteUserTweet, setUpdatedBookmarkedTweetUserTweetState } from "../userTweets/actionCreators";
import { setIsTweetBookmarkedAdditionalInfo } from "../tweetAdditionalInfo/actionCreators";
import { LoadingStatus } from "../../../types/common";
import { PAGE_TOTAL_COUNT } from "../../../constants/common-constants";
import { BookmarkApi } from "../../../services/api/tweet-service/bookmarkApi";
import { LikeTweetApi } from "../../../services/api/tweet-service/likeTweetApi";
import { RetweetApi } from "../../../services/api/tweet-service/retweetApi";
import { TweetApi } from "../../../services/api/tweet-service/tweetApi";

export function* fetchTweetDataRequest({ payload: tweetId }: FetchTweetDataActionInterface) {
    try {
        yield put(setTweetLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse> = yield call(TweetApi.getTweetById, tweetId);
        yield put(setTweetData(response.data));
    } catch (error: any) {
        yield put(setErrorMessage(error.response.data));
    }
}

export function* addTweetToBookmarksRequest({ payload }: AddTweetToBookmarksActionInterface) {
    try {
        const { data }: AxiosResponse<boolean> = yield call(BookmarkApi.processUserBookmarks, payload);
        yield put(setBookmarkedTweet(data));
        yield put(setUpdatedBookmarkedTweetTweetsState({ tweetId: payload, isTweetBookmarked: data }));
        yield put(setUpdatedBookmarkedTweetUserTweetState({ tweetId: payload, isTweetBookmarked: data }));
        yield put(setIsTweetBookmarkedAdditionalInfo(data));
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchReplyTweetRequest({ payload }: FetchReplyTweetActionInterface) {
    try {
        yield call(TweetApi.replyTweet, payload);
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* deleteTweetReplyRequest({ payload }: DeleteTweetReplyActionInterface) {
    try {
        yield call(TweetApi.deleteTweet, payload);
        yield put(deleteUserTweet(payload));
        yield put(deleteTweet(payload));
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

// liked and retweeted users
export function* fetchLikedUsersRequest({ payload }: FetchLikedUsersActionInterface) {
    try {
        yield put(setLikedUsersLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(LikeTweetApi.getLikedUsersByTweetId, payload);
        yield put(setLikedUsers({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setLikedUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchRetweetedUsersRequest({ payload }: FetchRetweetedUsersActionInterface) {
    try {
        yield put(setRetweetedUsersLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(RetweetApi.getRetweetedUsersByTweetId, payload);
        yield put(setRetweetedUsers({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setRetweetedUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTaggedImageUsersRequest({ payload }: FetchTaggedImageUsersActionInterface) {
    try {
        yield put(setTaggedImageUsersLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(TweetApi.getTaggedImageUsers, payload);
        yield put(setTaggedImageUsers({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setTaggedImageUsersLoadingState(LoadingStatus.ERROR));
    }
}

// replies
export function* fetchRepliesRequest({ payload }: FetchRepliesActionInterface) {
    try {
        yield put(setRepliesLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(TweetApi.getRepliesByTweetId, payload);
        yield put(setReplies(response.data));
    } catch (error) {
        yield put(setRepliesLoadingState(LoadingStatus.ERROR));
    }
}

export function* tweetSaga() {
    yield takeEvery(TweetActionType.FETCH_TWEET_DATA, fetchTweetDataRequest);
    yield takeEvery(TweetActionType.ADD_TWEET_TO_BOOKMARKS, addTweetToBookmarksRequest);
    yield takeEvery(TweetActionType.FETCH_REPLY_TWEET, fetchReplyTweetRequest);
    yield takeEvery(TweetActionType.DELETE_TWEET_REPLY, deleteTweetReplyRequest);
    // liked and retweeted users
    yield takeEvery(TweetActionType.FETCH_LIKED_USERS, fetchLikedUsersRequest);
    yield takeEvery(TweetActionType.FETCH_RETWEETED_USERS, fetchRetweetedUsersRequest);
    yield takeEvery(TweetActionType.FETCH_TAGGED_IMAGE_USERS, fetchTaggedImageUsersRequest);
    // replies
    yield takeEvery(TweetActionType.FETCH_REPLIES, fetchRepliesRequest);
}
