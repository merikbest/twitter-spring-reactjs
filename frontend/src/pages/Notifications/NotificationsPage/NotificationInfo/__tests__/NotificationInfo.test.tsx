import React from "react";
import ReactRouter from "react-router";

import NotificationInfo from "../NotificationInfo";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import Spinner from "../../../../../components/Spinner/Spinner";
import { NotificationsActionsType } from "../../../../../store/ducks/notifications/contracts/actionTypes";
import { mockNotificationInfo } from "../../../../../util/test-utils/mock-test-data";
import TweetComponent from "../../../../../components/TweetComponent/TweetComponent";
import UsersItem, { UserItemSize } from "../../../../../components/UsersItem/UsersItem";
import { LoadingStatus, NotificationType } from "../../../../../types/common";

window.scrollTo = jest.fn();

describe("NotificationInfo", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockNotification = {
        ...mockStore,
        notifications: {
            ...mockStore.notifications,
            notificationInfo: mockNotificationInfo
        }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "1" });
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<NotificationInfo />, createMockRootState());

        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { payload: 1, type: NotificationsActionsType.FETCH_NOTIFICATION_INFO });
    });

    it("should render Like NotificationInfo", () => {
        const wrapper = mountWithStore(<NotificationInfo />, mockNotification);

        expect(wrapper.text().includes("Liked")).toBe(true);
        expect(wrapper.text().includes(`by ${mockNotificationInfo.user.fullName}`)).toBe(true);
        expect(wrapper.find(TweetComponent).exists()).toBeTruthy();
        expect(wrapper.find(TweetComponent).prop("tweet")).toBe(mockNotificationInfo.tweet);
        expect(wrapper.find(UsersItem).exists()).toBeTruthy();
        expect(wrapper.find(UsersItem).prop("user")).toBe(mockNotificationInfo.user);
        expect(wrapper.find(UsersItem).prop("size")).toBe(UserItemSize.MEDIUM);
    });

    it("should render Retweet NotificationInfo", () => {
        const mockNotificationRetweet = {
            ...mockStore,
            notifications: {
                ...mockStore.notifications,
                notificationInfo: {
                    ...mockNotificationInfo,
                    notificationType: NotificationType.RETWEET
                }
            }
        };
        const wrapper = mountWithStore(<NotificationInfo />, mockNotificationRetweet);

        expect(wrapper.text().includes("Retweeted")).toBe(true);
        expect(wrapper.text().includes(`by ${mockNotificationInfo.user.fullName}`)).toBe(true);
    });

    it("should reset NotificationInfo State", () => {
        const wrapper = mountWithStore(<NotificationInfo />, mockNotification);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(2, { type: NotificationsActionsType.RESET_NOTIFICATION_STATE });
    });
});
