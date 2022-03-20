import {
    fetchNotificationInfoRequest,
    fetchNotificationsFromTweetAuthorsRequest,
    fetchNotificationsRequest,
    notificationsSaga
} from "./sagas";
import {
    fetchNotificationInfo,
    fetchNotificationsFromTweetAuthors,
    setNotificationInfo,
    setNotifications,
    setNotificationsLoadingState
} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {NotificationInfoResponse, NotificationsResponse} from "../../types/notification";
import {UserApi} from "../../../services/api/userApi";
import {setPageableTweets} from "../tweets/actionCreators";
import {AxiosResponse} from "axios";
import {TweetResponse} from "../../types/tweet";
import {NotificationsActionsType} from "./contracts/actionTypes";

describe("notificationsSaga:", () => {
    
    describe("fetchNotificationsRequest:", () => {
        const mockNotificationsResponse = {notifications: [{id: 1}]} as NotificationsResponse;
        const worker = fetchNotificationsRequest();

        testLoadingStatus(worker, setNotificationsLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUserNotifications);
        testSetResponse(worker, mockNotificationsResponse, setNotifications, mockNotificationsResponse, "NotificationsResponse");
        testLoadingStatus(worker, setNotificationsLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchNotificationsFromTweetAuthorsRequest:", () => {
        const mockPageableTweets = {
            data: [{id: 1}],
            headers: {"page-total-count": 1}
        } as AxiosResponse<TweetResponse[]>;
        const worker = fetchNotificationsFromTweetAuthorsRequest(fetchNotificationsFromTweetAuthors(1));

        testLoadingStatus(worker, setNotificationsLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getNotificationsFromTweetAuthors, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");
        testLoadingStatus(worker, setNotificationsLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchNotificationInfoRequest:", () => {
        const mockNotificationInfoResponse = {id: 1} as NotificationInfoResponse;
        const worker = fetchNotificationInfoRequest(fetchNotificationInfo(1));

        testCall(worker, UserApi.getUserNotificationById, 1);
        testSetResponse(worker, mockNotificationInfoResponse, setNotificationInfo, mockNotificationInfoResponse, "NotificationInfoResponse");
        testLoadingStatus(worker, setNotificationsLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(notificationsSaga, [
        {actionType: NotificationsActionsType.FETCH_NOTIFICATIONS, workSaga: fetchNotificationsRequest},
        {actionType: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS, workSaga: fetchNotificationsFromTweetAuthorsRequest},
        {actionType: NotificationsActionsType.FETCH_NOTIFICATION_INFO, workSaga: fetchNotificationInfoRequest},
    ]);
});
