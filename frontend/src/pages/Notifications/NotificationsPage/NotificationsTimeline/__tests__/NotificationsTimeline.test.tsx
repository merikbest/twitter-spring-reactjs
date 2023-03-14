import React from "react";

import NotificationsTimeline from "../NotificationsTimeline";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { NotificationsActionsType } from "../../../../../store/ducks/notifications/contracts/actionTypes";
import Spinner from "../../../../../components/Spinner/Spinner";
import TweetComponent from "../../../../../components/TweetComponent/TweetComponent";
import { TweetsActionType } from "../../../../../store/ducks/tweets/contracts/actionTypes";
import { LoadingStatus } from "../../../../../types/common";

window.scrollTo = jest.fn();

describe("NotificationsTimeline", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<NotificationsTimeline />, createMockRootState());

        expect(wrapper.text().includes("Tweets")).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: 0,
            type: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS
        });
    });

    it("should render NotificationsTimeline", () => {
        const wrapper = mountWithStore(<NotificationsTimeline />, mockStore);

        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should reset NotificationsTimeline", () => {
        const wrapper = mountWithStore(<NotificationsTimeline />, mockStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(2, { type: TweetsActionType.RESET_TWEETS });
    });
});
