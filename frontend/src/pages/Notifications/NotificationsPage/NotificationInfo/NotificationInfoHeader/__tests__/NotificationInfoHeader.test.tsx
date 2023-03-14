import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus, NotificationType } from "../../../../../../types/common";
import { mockNotificationInfo } from "../../../../../../util/test-utils/mock-test-data";
import NotificationInfoHeader from "../NotificationInfoHeader";

describe("NotificationInfoHeader", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    const mockNotification = {
        ...mockRootStore,
        notifications: {
            ...mockRootStore.notifications,
            notificationInfo: mockNotificationInfo
        }
    };

    it("should render Liked info header", () => {
        const wrapper = mountWithStore(<NotificationInfoHeader />, mockNotification);
        expect(wrapper.text().includes(`Likedby ${mockNotificationInfo.user.fullName}`)).toBe(true);
    });

    it("should render Retweeted info header", () => {
        const mockStore = {
            ...mockRootStore,
            notifications: {
                ...mockRootStore.notifications,
                notificationInfo: { ...mockNotificationInfo, notificationType: NotificationType.RETWEET }
            }
        };
        const wrapper = mountWithStore(<NotificationInfoHeader />, mockStore);
        expect(wrapper.text().includes(`Retweetedby ${mockNotificationInfo.user.fullName}`)).toBe(true);
    });
});
