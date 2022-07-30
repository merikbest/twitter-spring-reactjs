import {
    selectIsNotificationInfoLoading,
    selectIsNotificationsLoaded,
    selectIsNotificationsLoading,
    selectNotificationInfo,
    selectNotificationsList,
    selectNotificationsTweetAuthors
} from "../selectors";
import {LoadingStatus} from "../../../types";
import {createMockRootState} from "../../../../util/testHelper";
import {mockNotificationInfo, mockNotifications, mockTweetAuthors} from "../../../../util/mockData/mockData";

describe("notifications selectors:", () => {
    const mockState = createMockRootState();

    describe("selectNotificationsList", () => {
        it("should return NotificationResponse array", () => {
            expect(selectNotificationsList({
                ...mockState,
                notifications: {...mockState.notifications, notificationsList: mockNotifications}
            })).toBe(mockNotifications);
        });
    });

    describe("selectNotificationsTweetAuthors", () => {
        it("should return NotificationUserResponse array", () => {
            expect(selectNotificationsTweetAuthors({
                ...mockState,
                notifications: {...mockState.notifications, tweetAuthors: mockTweetAuthors}
            })).toBe(mockTweetAuthors);
        });
    });

    describe("selectIsNotificationsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsNotificationsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsNotificationsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsNotificationsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });

    describe("selectNotificationInfo", () => {
        it("should return NotificationInfoResponse", () => {
            expect(selectNotificationInfo({
                ...mockState,
                notifications: {...mockState.notifications, notificationInfo: mockNotificationInfo}
            })).toBe(mockNotificationInfo);
        });
    });

    describe("selectIsNotificationInfoLoading", () => {
        it("should return correct result", () => {
            expect(selectIsNotificationInfoLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
