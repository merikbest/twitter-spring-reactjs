import {call, put, takeLatest} from 'redux-saga/effects';

import {addTweet, likeTweet, setAddFormState, setTweets, setTweetsLoadingStatus} from "./actionCreators";
import {TweetsApi} from "../../../services/api/tweetsApi";
import {AddFormState, Tweet} from "./contracts/state";
import {
    FetchAddTweetActionInterface, FetchLikedTweetsActionInterface,
    FetchLikeTweetActionInterface,
    FetchRetweetActionInterface,
    FetchTweetsByTagActionInterface,
    FetchTweetsByTextActionInterface,
    FetchTweetsByUserActionInterface,
    FetchUserTweetsActionInterface,
    RemoveTweetActionInterface,
    TweetsActionType
} from "./contracts/actionTypes";
import {LoadingStatus} from '../../types';
import {setTweetData} from "../tweet/actionCreators";
import {TagsApi} from "../../../services/api/tagsApi";

export function* fetchTweetsRequest() {
    try {
        // ?????????????????
        const items: Tweet[] = yield call(TweetsApi.fetchTweets);
        yield put(setTweets(items));
    } catch (e) {
        yield put(setTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchTweetsByUserRequest({payload}: FetchTweetsByUserActionInterface) {
    try {
        const item: Tweet[] = yield call(TweetsApi.fetchTweetsByUser, payload);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setAddFormState(AddFormState.ERROR));
    }
}

export function* fetchTweetsByTagRequest({payload}: FetchTweetsByTagActionInterface) {
    try {
        const item: Tweet[] = yield call(TagsApi.fetchTweetsByTag, payload);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setAddFormState(AddFormState.ERROR));
    }
}

export function* fetchTweetsByTextRequest({payload}: FetchTweetsByTextActionInterface) {
    try {
        const item: Tweet[] = yield call(TweetsApi.searchTweets, payload);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setAddFormState(AddFormState.ERROR));
    }
}

export function* fetchLikedTweetsRequest({payload}: FetchLikedTweetsActionInterface) {
    try {
        const item: Tweet[] = yield call(TweetsApi.getUserLikedTweets, payload);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setAddFormState(AddFormState.ERROR));
    }
}

export function* fetchUserTweetsRequest({payload}: FetchUserTweetsActionInterface) {
    try {
        const item: Tweet[] = yield call(TweetsApi.getUserTweets, payload);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setAddFormState(AddFormState.ERROR));
    }
}

export function* fetchAddTweetRequest({payload}: FetchAddTweetActionInterface) {
    try {
        const item: Tweet[] = yield call(TweetsApi.addTweet, payload);
        yield put(addTweet(item));
    } catch (e) {
        yield put(setAddFormState(AddFormState.ERROR));
    }
}

export function* fetchRemoveTweetRequest({payload}: RemoveTweetActionInterface) {
    try {
        yield call(TweetsApi.removeTweet, payload);
    } catch (error) {
        alert('Ошибка при удалении твита');
    }
}

export function* fetchLikeTweetRequest({payload}: FetchLikeTweetActionInterface) {
    const item: Tweet = yield call(TweetsApi.likeTweet, payload);
    yield put(likeTweet(item));
    yield put(setTweetData(item));
}

export function* fetchRetweetRequest({payload}: FetchRetweetActionInterface) {
    const item: Tweet = yield call(TweetsApi.retweet, payload);
    yield put(likeTweet(item));
    yield put(setTweetData(item));
}

export function* tweetsSaga() {
    yield takeLatest(TweetsActionType.FETCH_TWEETS, fetchTweetsRequest);
    yield takeLatest(TweetsActionType.FETCH_ADD_TWEET, fetchAddTweetRequest);
    yield takeLatest(TweetsActionType.REMOVE_TWEET, fetchRemoveTweetRequest);
    yield takeLatest(TweetsActionType.FETCH_LIKE_TWEET, fetchLikeTweetRequest);
    yield takeLatest(TweetsActionType.FETCH_RETWEET, fetchRetweetRequest);
    yield takeLatest(TweetsActionType.FETCH_TWEETS_BY_USER, fetchUserTweetsRequest);
    yield takeLatest(TweetsActionType.FETCH_TWEETS_BY_TAG, fetchTweetsByTagRequest);
    yield takeLatest(TweetsActionType.FETCH_TWEETS_BY_TEXT, fetchTweetsByTextRequest);
    yield takeLatest(TweetsActionType.FETCH_LIKED_TWEETS, fetchLikedTweetsRequest);
}
