import {
    selectIsNotificationInfoLoading,
    selectIsNotificationsLoaded,
    selectIsNotificationsLoading,
    selectNotificationInfo,
    selectNotificationsList,
    selectNotificationsTweetAuthors
} from "./selectors";
import {LoadingStatus} from "../../types";
import {
    createMockRootState,
    mockNotificationInfoResponse,
    mockNotificationResponse,
    mockNotificationUserResponse
} from "../../../util/testHelper";

describe("notifications selectors:", () => {

    describe("selectNotificationsList", () => {
        it("should return NotificationResponse array", () => {
            expect(selectNotificationsList(createMockRootState())).toBe(mockNotificationResponse);
        });
    });

    describe("selectNotificationsTweetAuthors", () => {
        it("should return NotificationUserResponse array", () => {
            expect(selectNotificationsTweetAuthors(createMockRootState())).toBe(mockNotificationUserResponse);
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
            expect(selectNotificationInfo(createMockRootState())).toBe(mockNotificationInfoResponse);
        });
    });

    describe("selectIsNotificationInfoLoading", () => {
        it("should return correct result", () => {
            expect(selectIsNotificationInfoLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
