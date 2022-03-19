import {call, put, takeLatest} from 'redux-saga/effects';

import {setPageableTweets, setTweets, setTweetsLoadingState,} from "./actionCreators";
import {TweetApi} from "../../../services/api/tweetApi";
import {
    AddPollActionInterface,
    AddQuoteTweetActionInterface,
    AddScheduledTweetActionInterface,
    AddTweetActionInterface,
    ChangeReplyTypeActionInterface,
    DeleteScheduledTweetsActionInterface,
    FetchBookmarksActionInterface,
    FetchDeleteTweetActionInterface,
    FetchFollowersTweetsActionInterface,
    FetchMediaTweetsActionInterface,
    FetchTweetsActionInterface,
    FetchTweetsByListIdActionInterface,
    FetchTweetsByTagActionInterface,
    FetchTweetsByTextActionInterface,
    FetchTweetsWithVideoActionInterface,
    LikeTweetActionInterface,
    RetweetActionInterface,
    TweetsActionType,
    UpdateScheduledTweetActionInterface,
    VoteActionInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from '../../types';
import {TagApi} from "../../../services/api/tagApi";
import {UserApi} from "../../../services/api/userApi";
import {AxiosResponse} from "axios";
import {TweetResponse} from "../../types/tweet";
import {ListsApi} from "../../../services/api/listsApi";

export function* fetchTweetsRequest({payload}: FetchTweetsActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(TweetApi.fetchTweets, payload);
        yield put(setPageableTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchMediaTweetsRequest({payload}: FetchMediaTweetsActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(TweetApi.fetchMediaTweets, payload);
        yield put(setPageableTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetsWithVideoRequest({payload}: FetchTweetsWithVideoActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(TweetApi.fetchTweetsWithVideo, payload);
        yield put(setPageableTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFollowersTweetsRequest({payload}: FetchFollowersTweetsActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(TweetApi.fetchFollowersTweets, payload);
        yield put(setPageableTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetsByTagRequest({payload}: FetchTweetsByTagActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const item: TweetResponse[] = yield call(TagApi.fetchTweetsByTag, payload);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetsByTextRequest({payload}: FetchTweetsByTextActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const item: TweetResponse[] = yield call(TweetApi.searchTweets, payload);
        yield put(setTweets(item));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetsByListIdRequest({payload}: FetchTweetsByListIdActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(ListsApi.getTweetsByListId, payload.listId, payload.pageNumber);
        yield put(setPageableTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* addTweetRequest({payload}: AddTweetActionInterface) {
    try {
        yield call(TweetApi.createTweet, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* addPollRequest({payload}: AddPollActionInterface) {
    try {
        yield call(TweetApi.createPoll, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* addScheduledTweetRequest({payload}: AddScheduledTweetActionInterface) {
    try {
        yield call(TweetApi.createScheduledTweet, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* updateScheduledTweetRequest({payload}: UpdateScheduledTweetActionInterface) {
    try {
        yield call(TweetApi.updateScheduledTweet, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* addQuoteTweetRequest({payload}: AddQuoteTweetActionInterface) {
    try {
        yield call(TweetApi.quoteTweet, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* voteRequest({payload}: VoteActionInterface) {
    try {
        yield call(TweetApi.voteInPoll, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* changeReplyTypeRequest({payload}: ChangeReplyTypeActionInterface) {
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

export function* deleteScheduledTweetsTweetRequest({payload}: DeleteScheduledTweetsActionInterface) {
    try {
        yield call(TweetApi.deleteScheduledTweets, payload);
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* likeTweetRequest({payload}: LikeTweetActionInterface) {
    yield call(TweetApi.likeTweet, payload);
}

export function* retweetRequest({payload}: RetweetActionInterface) {
    yield call(TweetApi.retweet, payload);
}

export function* fetchUserBookmarksRequest({payload}: FetchBookmarksActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(UserApi.getUserBookmarks, payload);
        yield put(setPageableTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* tweetsSaga() {
    yield takeLatest(TweetsActionType.FETCH_TWEETS, fetchTweetsRequest);
    yield takeLatest(TweetsActionType.FETCH_MEDIA_TWEETS, fetchMediaTweetsRequest);
    yield takeLatest(TweetsActionType.FETCH_TWEETS_WITH_VIDEO, fetchTweetsWithVideoRequest);
    yield takeLatest(TweetsActionType.FETCH_FOLLOWERS_TWEETS, fetchFollowersTweetsRequest);
    yield takeLatest(TweetsActionType.ADD_TWEET, addTweetRequest);
    yield takeLatest(TweetsActionType.ADD_POLL, addPollRequest);
    yield takeLatest(TweetsActionType.ADD_SCHEDULED_TWEET, addScheduledTweetRequest);
    yield takeLatest(TweetsActionType.UPDATE_SCHEDULED_TWEET, updateScheduledTweetRequest);
    yield takeLatest(TweetsActionType.ADD_QUOTE_TWEET, addQuoteTweetRequest);
    yield takeLatest(TweetsActionType.VOTE, voteRequest);
    yield takeLatest(TweetsActionType.CHANGE_REPLY_TYPE, changeReplyTypeRequest);
    yield takeLatest(TweetsActionType.FETCH_DELETE_TWEET, fetchDeleteTweetRequest);
    yield takeLatest(TweetsActionType.DELETE_SCHEDULED_TWEETS, deleteScheduledTweetsTweetRequest);
    yield takeLatest(TweetsActionType.LIKE_TWEET, likeTweetRequest);
    yield takeLatest(TweetsActionType.RETWEET, retweetRequest);
    yield takeLatest(TweetsActionType.FETCH_TWEETS_BY_TAG, fetchTweetsByTagRequest);
    yield takeLatest(TweetsActionType.FETCH_TWEETS_BY_TEXT, fetchTweetsByTextRequest);
    yield takeLatest(TweetsActionType.FETCH_TWEETS_BY_LIST_ID, fetchTweetsByListIdRequest);
    yield takeLatest(TweetsActionType.FETCH_BOOKMARKS, fetchUserBookmarksRequest);
}
