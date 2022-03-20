import {call, put, takeLatest} from 'redux-saga/effects';

import {
    FetchNotificationInfoActionInterface,
    FetchNotificationsFromTweetAuthorsActionInterface,
    NotificationsActionsType
} from "./contracts/actionTypes";
import {setNotificationInfo, setNotifications, setNotificationsLoadingState} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {UserApi} from "../../../services/api/userApi";
import {setPageableTweets} from "../tweets/actionCreators";
import {AxiosResponse} from "axios";
import {NotificationInfoResponse, NotificationsResponse} from "../../types/notification";
import {TweetResponse} from "../../types/tweet";

export function* fetchNotificationsRequest() {
    try {
        yield put(setNotificationsLoadingState(LoadingStatus.LOADING));
        const items: NotificationsResponse = yield call(UserApi.getUserNotifications);
        yield put(setNotifications(items));
    } catch (error) {
        yield put(setNotificationsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchNotificationsFromTweetAuthorsRequest({payload}: FetchNotificationsFromTweetAuthorsActionInterface) {
    try {
        yield put(setNotificationsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]>  = yield call(UserApi.getNotificationsFromTweetAuthors, payload);
        yield put(setPageableTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (error) {
        yield put(setNotificationsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchNotificationInfoRequest({payload}: FetchNotificationInfoActionInterface) {
    try {
        const items: NotificationInfoResponse = yield call(UserApi.getUserNotificationById, payload);
        yield put(setNotificationInfo(items));
    } catch (error) {
        yield put(setNotificationsLoadingState(LoadingStatus.ERROR));
    }
}

export function* notificationsSaga() {
    yield takeLatest(NotificationsActionsType.FETCH_NOTIFICATIONS, fetchNotificationsRequest);
    yield takeLatest(NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS, fetchNotificationsFromTweetAuthorsRequest);
    yield takeLatest(NotificationsActionsType.FETCH_NOTIFICATION_INFO, fetchNotificationInfoRequest);
}
