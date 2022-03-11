import {call, put, takeEvery} from 'redux-saga/effects';

import {TweetApi} from "../../../services/api/tweetApi";
import {
    AddTweetToBookmarksActionInterface,
    DeleteTweetReplyActionInterface,
    FetchLikedUsersActionInterface,
    FetchRepliesActionInterface,
    FetchReplyTweetActionInterface,
    FetchRetweetedUsersActionInterface,
    FetchTweetDataActionInterface,
    TweetActionType
} from "./contracts/actionTypes";
import {
    setBookmarkedTweet,
    setLikedUsers,
    setLikedUsersLoadingState,
    setReplies,
    setRepliesLoadingState,
    setRetweetedUsers,
    setRetweetedUsersLoadingState,
    setTweetData,
    setTweetLoadingState
} from './actionCreators';
import {LoadingStatus} from '../../types';
import {TweetResponse} from "../../types/tweet";
import {UserApi} from "../../../services/api/userApi";
import {UserResponse} from "../../types/user";
import {setUpdatedBookmarkedTweetTweetsState} from "../tweets/actionCreators";
import {setUpdatedBookmarkedTweetUserTweetState} from "../userTweets/actionCreators";

export function* fetchTweetDataRequest({payload: tweetId}: FetchTweetDataActionInterface) {
    try {
        yield put(setTweetLoadingState(LoadingStatus.LOADING));
        const data: TweetResponse = yield call(TweetApi.fetchTweetData, tweetId);
        yield put(setTweetData(data));
    } catch (error) {
        yield put(setTweetLoadingState(LoadingStatus.ERROR));
    }
}

export function* addTweetToBookmarksRequest({payload}: AddTweetToBookmarksActionInterface) {
    try {
        const item: boolean = yield call(UserApi.addTweetToBookmarks, payload);
        yield put(setBookmarkedTweet(item));
        yield put(setUpdatedBookmarkedTweetTweetsState({tweetId: payload, isTweetBookmarked: item}));
        yield put(setUpdatedBookmarkedTweetUserTweetState({tweetId: payload, isTweetBookmarked: item}));
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

// liked and retweeted users
export function* fetchLikedUsersRequest({payload}: FetchLikedUsersActionInterface) {
    try {
        yield put(setLikedUsersLoadingState(LoadingStatus.LOADING));
        const data: UserResponse[] = yield call(TweetApi.getLikedUsersByTweetId, payload);
        yield put(setLikedUsers(data));
    } catch (error) {
        yield put(setLikedUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchRetweetedUsersRequest({payload}: FetchRetweetedUsersActionInterface) {
    try {
        yield put(setRetweetedUsersLoadingState(LoadingStatus.LOADING));
        const data: UserResponse[] = yield call(TweetApi.getRetweetedUsersByTweetId, payload);
        yield put(setRetweetedUsers(data));
    } catch (error) {
        yield put(setRetweetedUsersLoadingState(LoadingStatus.ERROR));
    }
}

// replies
export function* fetchRepliesRequest({payload}: FetchRepliesActionInterface) {
    try {
        yield put(setRepliesLoadingState(LoadingStatus.LOADING));
        const data: TweetResponse[] = yield call(TweetApi.getRepliesByTweetId, payload);
        yield put(setReplies(data));
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
    // replies
    yield takeEvery(TweetActionType.FETCH_REPLIES, fetchRepliesRequest);
}
