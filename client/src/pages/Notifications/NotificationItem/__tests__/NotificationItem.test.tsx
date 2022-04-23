import React from "react";
import {Link} from "react-router-dom";
import ReactRouter from "react-router";
import {Avatar} from "@material-ui/core";
import {Emoji} from "emoji-mart";

import NotificationItem from "../NotificationItem";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import {mockNotifications} from "../../../../util/mockData/mockData";
import {NotificationResponse} from "../../../../store/types/notification";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import PopperUserWindow from "../../../../components/PopperUserWindow/PopperUserWindow";

describe("NotificationItem", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockNotificationFollow = mockNotifications[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: "1"});
        mockDispatchFn = mockDispatch();
    });

    it("should render follow NotificationItem", () => {
        const wrapper = mountWithStore(
            <NotificationItem
                notification={mockNotificationFollow}
                handleClickUser={jest.fn()}
            />, mockStore);

        expect(wrapper.find(Link).prop("to")).toBe(`/profile/${mockNotificationFollow.user.id}`);
        expect(wrapper.find("#follow").exists()).toBe(true);
        expect(wrapper.find(Avatar).prop("alt")).toBe(`avatar ${mockNotificationFollow.id}`);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockNotificationFollow.user.avatar.src);
        expect(wrapper.text().includes(`${mockNotificationFollow.user.username} followed you`)).toBe(true);
    });

    it("should render like NotificationItem", () => {
        const mockNotificationLike = mockNotifications[1];
        const wrapper = mountWithStore(
            <NotificationItem
                notification={mockNotificationLike}
                handleClickUser={jest.fn()}
            />, mockStore);

        expect(wrapper.find(Link).prop("to")).toBe(`/notification/${mockNotificationLike.id}`);
        expect(wrapper.find("#like").exists()).toBe(true);
        expect(wrapper.text().includes(`${mockNotificationLike.user.username} liked your Tweet`)).toBe(true);
        expect(wrapper.text().includes("#myCat")).toBe(true);
        expect(wrapper.find(Emoji).prop("emoji")).toBe("smile_cat");
    });

    it("should render retweet NotificationItem", () => {
        const mockNotificationRetweet = mockNotifications[2];
        const mockRetweetUser = {
            ...mockNotificationRetweet,
            user: {...mockNotificationRetweet.user, avatar: {src: undefined}}
        } as unknown as NotificationResponse;

        const wrapper = mountWithStore(
            <NotificationItem
                notification={mockRetweetUser}
                handleClickUser={jest.fn()}
            />, mockStore);

        expect(wrapper.find("#retweet").exists()).toBe(true);
        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
        expect(wrapper.text().includes(`${mockNotificationRetweet.user.username} Retweeted your Tweet`)).toBe(true);
    });

    it("should hover user link and click", () => {
        jest.useFakeTimers();
        const mockHandleClickUser = jest.fn();
        const wrapper = mountWithStore(
            <NotificationItem
                notification={mockNotificationFollow}
                handleClickUser={mockHandleClickUser}
            />, mockStore);
        
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);

        wrapper.find("#clickUser").simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(true);

        wrapper.find("#clickUser").simulate("mouseleave");
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);

        wrapper.find("#clickUser").simulate("click");
        expect(mockHandleClickUser).toHaveBeenCalled();
    });
});
