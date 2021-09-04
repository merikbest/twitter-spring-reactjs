import {call, put, takeLatest} from 'redux-saga/effects';

import {
    likeTweet,
    retweet,
    setTweet,
    setTweets,
    setTweetsLoadingState,
    setUpdatedTweet
} from "./actionCreators";
import {TweetApi} from "../../../services/api/tweetApi";
import {Tweet} from "./contracts/state";
import {
    FetchAddPollActionInterface,
    FetchAddTweetActionInterface,
    FetchChangeReplyTypeActionInterface,
    FetchDeleteTweetActionInterface,
    FetchLikedTweetsActionInterface,
    FetchLikeTweetActionInterface,
    FetchRetweetActionInterface,
    FetchTweetsByTagActionInterface,
    FetchTweetsByTextActionInterface,
    FetchVoteActionInterface,
    TweetsActionType
} from "./contracts/actionTypes";
import {LoadingStatus} from '../../types';
import {setTweetData} from "../tweet/actionCreators";
import {TagApi} from "../../../services/api/tagApi";
import {UserApi} from "../../../services/api/userApi";
import {setAddedUserTweet, setUserLikedTweet, setUserRetweet} from "../userTweets/actionCreators";

export function* fetchTweetsRequest() {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const items: Tweet[] = yield call(TweetApi.fetchTweets);
        yield put(setTweets(items));
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
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const item: Tweet = yield call(TweetApi.createTweet, payload);
        yield put(setTweetsLoadingState(LoadingStatus.LOADED));
        if (payload.profileId === item.user.id) {
            yield put(setAddedUserTweet(item));
        }
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchAddPollRequest({payload}: FetchAddPollActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const item: Tweet = yield call(TweetApi.createPoll, payload);
        yield put(setTweet(item));

        if (payload.profileId === item.user.id) {
            yield put(setAddedUserTweet(item));
        }
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
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        yield call(TweetApi.deleteTweet, payload);
        yield put(setTweetsLoadingState(LoadingStatus.LOADED));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchLikeTweetRequest({payload}: FetchLikeTweetActionInterface) {
    const item: Tweet = yield call(TweetApi.likeTweet, payload);
    yield put(likeTweet(item));
    yield put(setTweetData(item));
    yield put(setUserLikedTweet(item));
}

export function* fetchRetweetRequest({payload}: FetchRetweetActionInterface) {
    const item: Tweet = yield call(TweetApi.retweet, payload);
    yield put(retweet(item));
    yield put(setTweetData(item));
    yield put(setUserRetweet(item));
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
    yield takeLatest(TweetsActionType.FETCH_ADD_TWEET, fetchAddTweetRequest);
    yield takeLatest(TweetsActionType.FETCH_ADD_POLL, fetchAddPollRequest);
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
