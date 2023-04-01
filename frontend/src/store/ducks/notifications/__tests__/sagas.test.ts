import { AxiosResponse } from "axios";

import {
    fetchFetchTweetAuthorsNotificationsRequest,
    fetchMentionsRequest,
    fetchNotificationInfoRequest,
    fetchNotificationsFromTweetAuthorsRequest,
    fetchNotificationsRequest,
    notificationsSaga
} from "../sagas";
import {
    fetchMentions,
    fetchNotificationInfo,
    fetchNotifications,
    fetchNotificationsFromTweetAuthors,
    setNotificationInfo,
    setNotifications,
    setNotificationsLoadingState,
    setTweetAuthorsLoadingState,
    setTweetAuthorsNotifications
} from "../actionCreators";
import {
    mockExpectedResponse,
    testCall,
    testLoadingStatus,
    testSetResponse,
    testWatchSaga
} from "../../../../util/test-utils/test-helper";
import {
    NotificationInfoResponse,
    NotificationResponse,
    NotificationsResponse,
    NotificationUserResponse
} from "../../../../types/notification";
import { setPageableTweets, setTweetsLoadingState } from "../../tweets/actionCreators";
import { TweetResponse } from "../../../../types/tweet";
import { NotificationsActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { NotificationApi } from "../../../../services/api/notification-service/notificationApi";

describe("notificationsSaga:", () => {

    describe("fetchNotificationsRequest:", () => {
        const mockPageableNotifications = {
            data: [{ id: 1 }],
            headers: { PAGE_TOTAL_COUNT: 1 }
        } as AxiosResponse<NotificationResponse[]>;
        const worker = fetchNotificationsRequest(fetchNotifications(0));

        testLoadingStatus(worker, setNotificationsLoadingState, LoadingStatus.LOADING);
        testCall(worker, NotificationApi.getUserNotifications, 0);
        testSetResponse(worker, mockPageableNotifications, setNotifications, mockExpectedResponse(mockPageableNotifications), "NotificationsResponse");
        testLoadingStatus(worker, setNotificationsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchFetchTweetAuthorsNotificationsRequest:", () => {
        const mockNotificationInfoResponse = { data: [{ id: 1 }] } as AxiosResponse<NotificationUserResponse[]>;
        const worker = fetchFetchTweetAuthorsNotificationsRequest();

        testLoadingStatus(worker, setTweetAuthorsLoadingState, LoadingStatus.LOADING);
        testCall(worker, NotificationApi.getTweetAuthorsNotifications);
        testSetResponse(worker, mockNotificationInfoResponse, setTweetAuthorsNotifications, mockNotificationInfoResponse.data, "NotificationInfoResponse");
        testLoadingStatus(worker, setTweetAuthorsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchNotificationsFromTweetAuthorsRequest:", () => {
        const mockPageableTweets = {
            data: [{ id: 1 }],
            headers: { PAGE_TOTAL_COUNT: 1 }
        } as AxiosResponse<TweetResponse[]>;
        const worker = fetchNotificationsFromTweetAuthorsRequest(fetchNotificationsFromTweetAuthors(1));

        testLoadingStatus(worker, setNotificationsLoadingState, LoadingStatus.LOADING);
        testCall(worker, NotificationApi.getNotificationsFromTweetAuthors, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, mockExpectedResponse(mockPageableTweets), "TweetResponse");
        testLoadingStatus(worker, setNotificationsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchMentionsRequest:", () => {
        const mockPageableTweets = {
            data: [{ id: 1 }],
            headers: { PAGE_TOTAL_COUNT: 1 }
        } as AxiosResponse<TweetResponse[]>;
        const worker = fetchMentionsRequest(fetchMentions(1));

        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, NotificationApi.getUserMentionsNotifications, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, mockExpectedResponse(mockPageableTweets), "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchNotificationInfoRequest:", () => {
        const mockNotificationInfoResponse = { data: { id: 1 } } as AxiosResponse<NotificationInfoResponse>;
        const worker = fetchNotificationInfoRequest(fetchNotificationInfo(1));

        testCall(worker, NotificationApi.getUserNotificationById, 1);
        testSetResponse(worker, mockNotificationInfoResponse, setNotificationInfo, mockNotificationInfoResponse.data, "NotificationInfoResponse");
        testLoadingStatus(worker, setNotificationsLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(notificationsSaga, [
        { actionType: NotificationsActionsType.FETCH_NOTIFICATIONS, workSaga: fetchNotificationsRequest },
        {
            actionType: NotificationsActionsType.FETCH_TWEET_AUTHORS_NOTIFICATIONS,
            workSaga: fetchFetchTweetAuthorsNotificationsRequest
        },
        {
            actionType: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS,
            workSaga: fetchNotificationsFromTweetAuthorsRequest
        },
        { actionType: NotificationsActionsType.FETCH_MENTIONS, workSaga: fetchMentionsRequest },
        { actionType: NotificationsActionsType.FETCH_NOTIFICATION_INFO, workSaga: fetchNotificationInfoRequest }
    ]);
});
