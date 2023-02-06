import {call, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from "axios";

import {
    FetchMentionsActionInterface,
    FetchNotificationInfoActionInterface,
    FetchNotificationsActionInterface,
    FetchNotificationsFromTweetAuthorsActionInterface,
    NotificationsActionsType
} from "./contracts/actionTypes";
import {
    setNotificationInfo,
    setNotifications,
    setNotificationsLoadingState,
    setTweetAuthorsLoadingState,
    setTweetAuthorsNotifications
} from "./actionCreators";
import {UserApi} from "../../../services/api/userApi";
import {setPageableTweets, setTweetsLoadingState} from "../tweets/actionCreators";
import {NotificationInfoResponse, NotificationResponse, NotificationUserResponse} from "../../types/notification";
import {TweetResponse} from "../../types/tweet";
import {LoadingStatus} from "../../types/common";
import {TweetApi} from "../../../services/api/tweetApi";

export function* fetchNotificationsRequest({payload}: FetchNotificationsActionInterface) {
    try {
        yield put(setNotificationsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<NotificationResponse[]> = yield call(UserApi.getUserNotifications, payload);
        yield put(setNotifications({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (error) {
        yield put(setNotificationsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFetchTweetAuthorsNotificationsRequest() {
    try {
        yield put(setTweetAuthorsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<NotificationUserResponse[]> = yield call(UserApi.getTweetAuthorsNotifications);
        yield put(setTweetAuthorsNotifications(response.data));
    } catch (error) {
        yield put(setTweetAuthorsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchNotificationsFromTweetAuthorsRequest({payload}: FetchNotificationsFromTweetAuthorsActionInterface) {
    try {
        yield put(setNotificationsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(UserApi.getNotificationsFromTweetAuthors, payload);
        yield put(setPageableTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (error) {
        yield put(setNotificationsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchMentionsRequest({payload}: FetchMentionsActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(TweetApi.getUserMentions, payload);
        yield put(setPageableTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (error) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchNotificationInfoRequest({payload}: FetchNotificationInfoActionInterface) {
    try {
        const response: AxiosResponse<NotificationInfoResponse> = yield call(UserApi.getUserNotificationById, payload);
        yield put(setNotificationInfo(response.data));
    } catch (error) {
        yield put(setNotificationsLoadingState(LoadingStatus.ERROR));
    }
}

export function* notificationsSaga() {
    yield takeLatest(NotificationsActionsType.FETCH_NOTIFICATIONS, fetchNotificationsRequest);
    yield takeLatest(NotificationsActionsType.FETCH_TWEET_AUTHORS_NOTIFICATIONS, fetchFetchTweetAuthorsNotificationsRequest);
    yield takeLatest(NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS, fetchNotificationsFromTweetAuthorsRequest);
    yield takeLatest(NotificationsActionsType.FETCH_MENTIONS, fetchMentionsRequest);
    yield takeLatest(NotificationsActionsType.FETCH_NOTIFICATION_INFO, fetchNotificationInfoRequest);
}
