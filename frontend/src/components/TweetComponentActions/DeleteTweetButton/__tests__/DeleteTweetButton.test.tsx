import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import TweetComponentActionsModal from "../../TweetComponentActionsModal/TweetComponentActionsModal";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";
import { TweetActionType } from "../../../../store/ducks/tweet/contracts/actionTypes";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import DeleteTweetButton from "../DeleteTweetButton";
import { LoadingStatus } from "../../../../types/common";
import { mockUserTweetAdditionalInfo } from "../../../../util/test-utils/mock-test-data";

describe("DeleteTweetButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click open/close TweetComponentActionsModal", () => {
        const mockState = {
            ...mockRootState,
            tweetAdditionalInfo: {
                ...mockRootState.tweetAdditionalInfo,
                tweetAdditionalInfo: mockUserTweetAdditionalInfo
            }
        };
        const wrapper = mountWithStore(<DeleteTweetButton tweetId={1} onCloseActionsDropdown={jest.fn()} />, mockState);
        expect(wrapper.text().includes("Delete")).toBe(true);
        expect(wrapper.find(TweetComponentActionsModal).prop("visibleTweetComponentActionsModal")).toBe(false);
        wrapper.find("#delete").at(0).simulate("click");
        expect(wrapper.find(TweetComponentActionsModal).prop("visibleTweetComponentActionsModal")).toBe(true);
        wrapper.find(TweetComponentActionsModal).find(Button).at(0).simulate("click");
        expect(wrapper.find(TweetComponentActionsModal).prop("visibleTweetComponentActionsModal")).toBe(false);
    });

    it("should click delete tweet reply", () => {
        testClickDeleteTweet(TweetActionType.DELETE_TWEET_REPLY, 1);
    });

    it("should click delete tweet", () => {
        testClickDeleteTweet(TweetsActionType.FETCH_DELETE_TWEET);
    });

    const testClickDeleteTweet = (tweetActionType: TweetActionType | TweetsActionType, addressedTweetId?: number): void => {
        const mockState = {
            ...mockRootState,
            tweetAdditionalInfo: {
                ...mockRootState.tweetAdditionalInfo,
                tweetAdditionalInfo: {
                    ...mockUserTweetAdditionalInfo,
                    addressedTweetId
                }
            }
        };
        const wrapper = mountWithStore(<DeleteTweetButton tweetId={1} onCloseActionsDropdown={jest.fn()} />, mockState);
        wrapper.find("#delete").at(0).simulate("click");
        wrapper.find(TweetComponentActionsModal).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: 1,
            type: tweetActionType
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: "Your Tweet was deleted",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    };
});
