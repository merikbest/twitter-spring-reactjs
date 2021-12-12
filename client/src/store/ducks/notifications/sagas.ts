import {call, put, takeLatest} from 'redux-saga/effects';

import {FetchNotificationsFromTweetAuthorsActionInterface, NotificationsActionsType} from "./contracts/actionTypes";
import {setNotifications, setNotificationsLoadingState} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {Notifications} from "./contracts/state";
import {UserApi} from "../../../services/api/userApi";
import {setPageableTweets} from "../tweets/actionCreators";
import {AxiosResponse} from "axios";
import {Tweet} from "../tweets/contracts/state";

export function* fetchNotificationsRequest() {
    try {
        yield put(setNotificationsLoadingState(LoadingStatus.LOADING));
        const items: Notifications = yield call(UserApi.getUserNotifications);
        yield put(setNotifications(items));
        yield put(setNotificationsLoadingState(LoadingStatus.LOADED));
    } catch (error) {
        yield put(setNotificationsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchNotificationsFromTweetAuthorsRequest({payload}: FetchNotificationsFromTweetAuthorsActionInterface) {
    try {
        yield put(setNotificationsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<Tweet[]>  = yield call(UserApi.getNotificationsFromTweetAuthors, payload);
        yield put(setPageableTweets({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (error) {
        yield put(setNotificationsLoadingState(LoadingStatus.ERROR));
    }
}

export function* notificationsSaga() {
    yield takeLatest(NotificationsActionsType.FETCH_NOTIFICATIONS, fetchNotificationsRequest);
    yield takeLatest(NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS, fetchNotificationsFromTweetAuthorsRequest);
}
