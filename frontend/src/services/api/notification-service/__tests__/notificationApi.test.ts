import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_NOTIFICATION,
    API_NOTIFICATION_SUBSCRIBES,
    API_NOTIFICATION_TIMELINE,
    API_NOTIFICATION_USER,
    API_NOTIFICATION_MENTIONS
} from "../../../../constants/endpoint-constants";
import { mockTweets } from "../../../../util/test-utils/mock-test-data";
import { NotificationApi } from "../notificationApi";

describe("NotificationApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch NotificationApi.getUserNotifications", () => {
        it("[200] should get user notifications Success", () => {
            testApiCall(mockAdapter, "onGet", API_NOTIFICATION_USER, 200, [{ id: 1 }], NotificationApi.getUserNotifications, 1);
        });
    });

    describe("should fetch NotificationApi.getUserMentionsNotifications", () => {
        it("[200] should get user mentions Success", () => {
            testApiCall(mockAdapter, "onGet", API_NOTIFICATION_MENTIONS, 200, mockTweets, NotificationApi.getUserMentionsNotifications, 1);
        });
    });

    describe("should fetch NotificationApi.getTweetAuthorsNotifications", () => {
        it("[200] should get tweet authors notifications Success", () => {
            testApiCall(mockAdapter, "onGet", API_NOTIFICATION_SUBSCRIBES, 200, [{ id: 1 }], NotificationApi.getTweetAuthorsNotifications);
        });
    });

    describe("should fetch NotificationApi.getUserNotificationById", () => {
        it("[200] should get user notification by id Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_NOTIFICATION}/1`, 200, [{ id: 1 }], NotificationApi.getUserNotificationById, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_NOTIFICATION}/1`, 404, "Notification not found", NotificationApi.getUserNotificationById, 1);
        });
    });

    describe("should fetch NotificationApi.getNotificationsFromTweetAuthors", () => {
        it("[200] should get notifications from tweet authors Success", () => {
            testApiCall(mockAdapter, "onGet", API_NOTIFICATION_TIMELINE, 200, mockTweets, NotificationApi.getNotificationsFromTweetAuthors, 1);
        });
    });
});
