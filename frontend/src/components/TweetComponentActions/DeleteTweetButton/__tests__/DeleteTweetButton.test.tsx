import React from "react";
import { Button } from "@material-ui/core";

import { mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import TweetComponentActionsModal from "../../TweetComponentActionsModal/TweetComponentActionsModal";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";
import { TweetActionType } from "../../../../store/ducks/tweet/contracts/actionTypes";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import DeleteTweetButton from "../DeleteTweetButton";

describe("DeleteTweetButton", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click open/close TweetComponentActionsModal", () => {
        const wrapper = mountWithStore(
            <DeleteTweetButton
                tweetId={1}
                addressedTweetId={1}
                onCloseActionsDropdown={jest.fn()}
            />);
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
        const wrapper = mountWithStore(
            <DeleteTweetButton
                tweetId={1}
                addressedTweetId={addressedTweetId}
                onCloseActionsDropdown={jest.fn()}
            />);
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
