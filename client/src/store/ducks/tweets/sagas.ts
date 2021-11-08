import {call, put, takeLatest} from 'redux-saga/effects';

import {setTweets, setTweets2, setTweetsLoadingState,} from "./actionCreators";
import {TweetApi} from "../../../services/api/tweetApi";
import {Tweet} from "./contracts/state";
import {
    FetchAddPollActionInterface,
    FetchAddQuoteTweetActionInterface,
    FetchAddTweetActionInterface,
    FetchChangeReplyTypeActionInterface,
    FetchDeleteTweetActionInterface,
    FetchLikedTweetsActionInterface,
    FetchLikeTweetActionInterface,
    FetchRetweetActionInterface,
    FetchTweetsActionInterface,
    FetchTweetsByTagActionInterface,
    FetchTweetsByTextActionInterface,
    FetchVoteActionInterface,
    TweetsActionType
} from "./contracts/actionTypes";
import {LoadingStatus} from '../../types';
import {TagApi} from "../../../services/api/tagApi";
import {UserApi} from "../../../services/api/userApi";
import {AxiosResponse} from "axios";

export function* fetchTweetsRequest({payload}: FetchTweetsActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<Tweet[]> = yield call(TweetApi.fetchTweets, payload);
        yield put(setTweets2({items: response.data, pagesCount: parseInt(response.headers["page-total-count"])}));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchMediaTweetsRequest() {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const items: Tweet[] = yield call(TweetApi.fetchMediaTweets);
        yield put(setTweets(items));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetsWithVideoRequest() {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const items: Tweet[] = yield call(TweetApi.fetchTweetsWithVideo);
        yield put(setTweets(items));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetsByTagRequest({payload}: FetchTweetsByTagActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const item: Tweet[] = yield call(TagApi.fetchTweetsByTag, payload);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetsByTextRequest({payload}: FetchTweetsByTextActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const item: Tweet[] = yield call(TweetApi.searchTweets, payload);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchLikedTweetsRequest({payload}: FetchLikedTweetsActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const item: Tweet[] = yield call(UserApi.getUserLikedTweets, payload);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchAddTweetRequest({payload}: FetchAddTweetActionInterface) {
    try {
        yield call(TweetApi.createTweet, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchAddPollRequest({payload}: FetchAddPollActionInterface) {
    try {
        yield call(TweetApi.createPoll, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchAddQuoteTweet({payload}: FetchAddQuoteTweetActionInterface) {
    try {
        yield call(TweetApi.quoteTweet, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchVoteRequest({payload}: FetchVoteActionInterface) {
    try {
        yield call(TweetApi.voteInPoll, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchChangeReplyTypeRequest({payload}: FetchChangeReplyTypeActionInterface) {
    try {
        yield call(TweetApi.changeTweetReplyType, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchDeleteTweetRequest({payload}: FetchDeleteTweetActionInterface) {
    try {
        yield call(TweetApi.deleteTweet, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchLikeTweetRequest({payload}: FetchLikeTweetActionInterface) {
    yield call(TweetApi.likeTweet, payload);
}

export function* fetchRetweetRequest({payload}: FetchRetweetActionInterface) {
    yield call(TweetApi.retweet, payload);
}

export function* fetchUserBookmarksRequest() {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const item: Tweet[] = yield call(UserApi.getUserBookmarks);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* tweetsSaga() {
    yield takeLatest(TweetsActionType.FETCH_TWEETS, fetchTweetsRequest);
    yield takeLatest(TweetsActionType.FETCH_MEDIA_TWEETS, fetchMediaTweetsRequest);
    yield takeLatest(TweetsActionType.FETCH_TWEETS_WITH_VIDEO, fetchTweetsWithVideoRequest);
    yield takeLatest(TweetsActionType.FETCH_ADD_TWEET, fetchAddTweetRequest);
    yield takeLatest(TweetsActionType.FETCH_ADD_POLL, fetchAddPollRequest);
    yield takeLatest(TweetsActionType.FETCH_ADD_QUOTE_TWEET, fetchAddQuoteTweet);
    yield takeLatest(TweetsActionType.FETCH_VOTE, fetchVoteRequest);
    yield takeLatest(TweetsActionType.FETCH_CHANGE_REPLY_TYPE, fetchChangeReplyTypeRequest);
    yield takeLatest(TweetsActionType.FETCH_DELETE_TWEET, fetchDeleteTweetRequest);
    yield takeLatest(TweetsActionType.FETCH_LIKE_TWEET, fetchLikeTweetRequest);
    yield takeLatest(TweetsActionType.FETCH_RETWEET, fetchRetweetRequest);
    yield takeLatest(TweetsActionType.FETCH_TWEETS_BY_TAG, fetchTweetsByTagRequest);
    yield takeLatest(TweetsActionType.FETCH_TWEETS_BY_TEXT, fetchTweetsByTextRequest);
    yield takeLatest(TweetsActionType.FETCH_LIKED_TWEETS, fetchLikedTweetsRequest);
    yield takeLatest(TweetsActionType.FETCH_BOOKMARKS, fetchUserBookmarksRequest);
}
