import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import Spinner from "../../../../components/Spinner/Spinner";
import TweetComponent from "../../../../components/TweetComponent/TweetComponent";
import { NotificationsActionsType } from "../../../../store/ducks/notifications/contracts/actionTypes";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import MentionsPage from "../MentionsPage";
import { LoadingStatus } from "../../../../types/common";

window.scrollTo = jest.fn();

describe("MentionsPage", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<MentionsPage />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render empty Mentions", () => {
        const mockTweetStore = { ...mockStore, tweets: { ...mockStore.lists, items: [] } };
        const wrapper = mountWithStore(<MentionsPage />, mockTweetStore);
        expect(wrapper.text().includes("Nothing to see here — yet")).toBe(true);
        expect(wrapper.text().includes("When someone mentions you, you’ll find it here.")).toBe(true);
    });

    it("should render tweets", () => {
        const wrapper = mountWithStore(<MentionsPage />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, { payload: 0, type: NotificationsActionsType.FETCH_MENTIONS });
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should unmount MentionsPage", () => {
        const wrapper = mountWithStore(<MentionsPage />, mockStore);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(3, { type: TweetsActionType.RESET_TWEETS });
    });
});
