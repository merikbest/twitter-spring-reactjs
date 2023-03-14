import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import TweetComponentActionsModal from "../../TweetComponentActionsModal/TweetComponentActionsModal";
import { LoadingStatus } from "../../../../types/common";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import PinTweetButton from "../PinTweetButton";

describe("PinTweetButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should open/close TweetComponentActionsModal", () => {
        const wrapper = mountWithStore(<PinTweetButton tweetId={1}
                                                       onCloseActionsDropdown={jest.fn()} />, mockRootState);
        expect(wrapper.find(TweetComponentActionsModal).prop("visibleTweetComponentActionsModal")).toBe(false);
        wrapper.find("#pin").at(0).simulate("click");
        expect(wrapper.find(TweetComponentActionsModal).prop("visibleTweetComponentActionsModal")).toBe(true);
        wrapper.find(TweetComponentActionsModal).find(Button).at(0).simulate("click");
        expect(wrapper.find(TweetComponentActionsModal).prop("visibleTweetComponentActionsModal")).toBe(false);
    });

    it("should click pin tweet", () => {
        testClickDeleteTweet(1, "Pin to your profile", "Your Tweet was pinned to your profile.");
    });

    it("should click unpin tweet", () => {
        testClickDeleteTweet(102, "Unpin from profile", "Your Tweet was unpinned from your profile.");
    });

    const testClickDeleteTweet = (tweetId: number, textMessage: string, snackbarMessage: string): void => {
        const wrapper = mountWithStore(
            <PinTweetButton
                tweetId={tweetId}
                onCloseActionsDropdown={jest.fn()}
            />, mockRootState);
        expect(wrapper.text().includes(textMessage)).toBe(true);
        wrapper.find("#pin").at(0).simulate("click");
        wrapper.find(TweetComponentActionsModal).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: tweetId,
            type: UserActionsType.FETCH_PIN_TWEET
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: snackbarMessage,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    };
});
