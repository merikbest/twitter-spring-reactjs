import React from "react";
import routeData from "react-router";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import AddTweetToBookmarksButton from "../AddTweetToBookmarksButton";
import { BOOKMARKS } from "../../../../constants/path-constants";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";
import { TweetActionType } from "../../../../store/ducks/tweet/contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("AddTweetToBookmarksButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click add Tweet to Bookmarks", () => {
        const wrapper = mountWithStore(<AddTweetToBookmarksButton tweetId={1} closeShareTweet={jest.fn()} />, mockRootState);
        wrapper.find("#clickAddTweetToBookmarks").at(0).simulate("click");
        expect(wrapper.text().includes("Add Tweet to Bookmarks")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: 1,
            type: TweetActionType.ADD_TWEET_TO_BOOKMARKS
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: "Tweet added to your Bookmarks",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click remove Tweet From Bookmarks", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: BOOKMARKS, hash: "", search: "", state: undefined
        });
        const mockState = {
            ...mockRootState,
            tweetAdditionalInfo : {
                ...mockRootState.tweetAdditionalInfo,
                isTweetBookmarked: true
            }
        };
        const wrapper = mountWithStore(<AddTweetToBookmarksButton tweetId={1} closeShareTweet={jest.fn()} />, mockState);
        wrapper.find("#clickAddTweetToBookmarks").at(0).simulate("click");
        expect(wrapper.text().includes("Remove Tweet from Bookmarks")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: 1,
            type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: "Tweet removed to your Bookmarks",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });
});
