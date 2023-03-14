import React from "react";

import Bookmarks from "../Bookmarks";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { mockUser } from "../../../util/test-utils/mock-test-data";
import Spinner from "../../../components/Spinner/Spinner";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import { TweetsActionType } from "../../../store/ducks/tweets/contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

window.scrollTo = jest.fn();

describe("Bookmarks", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Bookmarks />, createMockRootState());
        expect(wrapper.text().includes("Bookmarks")).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).toHaveBeenCalledWith({ payload: 0, type: TweetsActionType.FETCH_BOOKMARKS });
    });

    it("should render list of TweetComponent", () => {
        const wrapper = mountWithStore(<Bookmarks />, mockRootState);
        expect(wrapper.text().includes("Bookmarks")).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
        expect(mockDispatchFn).toHaveBeenCalledWith({ payload: 0, type: TweetsActionType.FETCH_BOOKMARKS });
    });

    it("should render empty list of TweetComponents", () => {
        const mockStore = {
            ...mockRootState,
            tweets: { items: [], pagesCount: 1, loadingState: LoadingStatus.LOADED }
        };
        const wrapper = mountWithStore(<Bookmarks />, mockStore);
        expect(wrapper.text().includes("Bookmarks")).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.text().includes("You haven’t added any Tweets to your Bookmarks yet")).toBe(true);
        expect(wrapper.text().includes("When you do, they’ll show up here.")).toBe(true);
        expect(wrapper.find(TweetComponent).length).toEqual(0);
        expect(mockDispatchFn).toHaveBeenCalledWith({ payload: 0, type: TweetsActionType.FETCH_BOOKMARKS });
    });

    it("should unmount Bookmarks", () => {
        const wrapper = mountWithStore(<Bookmarks />, createMockRootState());
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: TweetsActionType.RESET_TWEETS });
    });
});
