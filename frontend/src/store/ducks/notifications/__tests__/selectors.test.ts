import {
    selectIsNotificationInfoLoading,
    selectIsNotificationsLoaded,
    selectIsNotificationsLoading,
    selectIsTweetAuthorsNotificationsLoaded,
    selectIsTweetAuthorsNotificationsLoading,
    selectNotificationInfo,
    selectNotificationInfoTweet,
    selectNotificationInfoType,
    selectNotificationInfoUser,
    selectNotificationInfoUserFullName,
    selectNotificationsList,
    selectNotificationsTweetAuthors,
    selectPagesCount
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockNotificationInfo, mockNotifications, mockTweetAuthors } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("notifications selectors:", () => {
    const mockState = createMockRootState();
    const mockNotificationsState = {
        ...mockState,
        notifications: {
            ...mockState.notifications,
            notificationsList: mockNotifications,
            tweetAuthors: mockTweetAuthors,
            notificationInfo: mockNotificationInfo
        }
    };

    describe("selectNotificationsList", () => {
        it("should return NotificationResponse array", () => {
            expect(selectNotificationsList(mockNotificationsState)).toBe(mockNotifications);
        });
    });

    describe("selectPagesCount", () => {
        it("should return pages count number", () => {
            expect(selectPagesCount(mockState)).toBe(0);
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

    describe("selectNotificationsTweetAuthors", () => {
        it("should return NotificationUserResponse array", () => {
            expect(selectNotificationsTweetAuthors(mockNotificationsState)).toBe(mockTweetAuthors);
        });
    });

    describe("selectIsTweetAuthorsNotificationsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsTweetAuthorsNotificationsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsTweetAuthorsNotificationsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsTweetAuthorsNotificationsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });

    describe("selectNotificationInfo", () => {
        it("should return NotificationInfoResponse", () => {
            expect(selectNotificationInfo(mockNotificationsState)).toBe(mockNotificationInfo);
        });
    });

    describe("selectNotificationInfoType", () => {
        it("should return NotificationInfoType", () => {
            expect(selectNotificationInfoType(mockNotificationsState)).toBe("LIKE");
        });
    });

    describe("selectNotificationInfoUser", () => {
        it("should return NotificationInfoUser", () => {
            expect(selectNotificationInfoUser(mockNotificationsState)).toBe(mockNotificationInfo.user);
        });
    });

    describe("selectNotificationInfoUserFullName", () => {
        it("should return NotificationInfoUserFullName string", () => {
            expect(selectNotificationInfoUserFullName(mockNotificationsState)).toBe(mockNotificationInfo.user.fullName);
        });
    });

    describe("selectNotificationInfoTweet", () => {
        it("should return NotificationInfoTweet", () => {
            expect(selectNotificationInfoTweet(mockNotificationsState)).toBe(mockNotificationInfo.tweet);
        });
    });

    describe("selectIsNotificationInfoLoading", () => {
        it("should return correct result", () => {
            expect(selectIsNotificationInfoLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
