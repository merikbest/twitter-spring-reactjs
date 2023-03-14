import React from "react";
import routeData from "react-router";
import { ClickAwayListener, IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import SendDirectTweetModal from "../SendDirectTweetModal/SendDirectTweetModal";
import CloseButton from "../../CloseButton/CloseButton";
import { TweetActionType } from "../../../store/ducks/tweet/contracts/actionTypes";
import { TweetsActionType } from "../../../store/ducks/tweets/contracts/actionTypes";
import { BOOKMARKS } from "../../../constants/path-constants";
import ShareTweetIconButton from "../ShareTweetIconButton";
import { LoadingStatus } from "../../../types/common";
import { ActionSnackbarTypes } from "../../../store/ducks/actionSnackbar/contracts/actionTypes";
import HoverAction from "../../HoverAction/HoverAction";

describe("ShareTweetIconButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click Icon Button and render correctly", () => {
        const wrapper = mountWithStore(<ShareTweetIconButton tweetId={1} isFullTweet={false} />, mockRootState);

        wrapper.find(IconButton).simulate("click");

        expect(wrapper.text().includes("Send via Direct Message")).toBe(true);
        expect(wrapper.text().includes("Add Tweet to Bookmarks")).toBe(true);
        expect(wrapper.text().includes("Copy link to Tweet")).toBe(true);
        expect(wrapper.text().includes("Share Tweet via ...")).toBe(true);
        expect(wrapper.find(IconButton).prop("size")).toBe("small");
    });

    it("should click open and close Send Via Direct Message modal", () => {
        const wrapper = mountWithStore(<ShareTweetIconButton tweetId={1} isFullTweet={false} />, mockRootState);

        expect(wrapper.find(SendDirectTweetModal).prop("visible")).toBe(false);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#clickSendViaDirectMessage").at(0).simulate("click");

        expect(wrapper.find(SendDirectTweetModal).prop("visible")).toBe(true);

        wrapper.find(SendDirectTweetModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(SendDirectTweetModal).prop("visible")).toBe(false);
    });

    it("should click Copy Link To Tweet", () => {
        const wrapper = mountWithStore(<ShareTweetIconButton tweetId={1} isFullTweet={false} />, mockRootState);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#copyLinkToTweet").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: "Copied to clipboard",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click add tweet to Bookmarks", () => {
        const wrapper = mountWithStore(<ShareTweetIconButton tweetId={1} isFullTweet={false} />, mockRootState);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#clickAddTweetToBookmarks").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: 1,
            type: TweetActionType.ADD_TWEET_TO_BOOKMARKS
        });
        expect(mockDispatchFn).nthCalledWith(4, {
            payload: "Tweet added to your Bookmarks",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click remove tweet from Bookmarks", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: BOOKMARKS, hash: "", search: "", state: undefined
        });
        const wrapper = mountWithStore(<ShareTweetIconButton tweetId={1} isFullTweet={false} />, mockRootState);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#clickAddTweetToBookmarks").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: 1,
            type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS
        });
        expect(mockDispatchFn).nthCalledWith(4, {
            payload: "Tweet added to your Bookmarks",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should onMouseEnter and onMouseLeave IconButton", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<ShareTweetIconButton tweetId={1} isFullTweet={false} />, mockRootState);

        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(HoverAction).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Share");

        wrapper.find(IconButton).simulate("mouseleave");
        expect(wrapper.find(HoverAction).prop("visible")).toBe(false);
    });

    it("should render medium size IconButton", () => {
        const wrapper = mountWithStore(<ShareTweetIconButton tweetId={1} isFullTweet={true} />, mockRootState);
        expect(wrapper.find(IconButton).prop("size")).toBe("medium");
    });

    it("should click away ShareTweet", () => {
        const wrapper = mountWithStore(<ShareTweetIconButton tweetId={1} isFullTweet={false} />, mockRootState);
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());

        expect(wrapper.find(ClickAwayListener).exists()).toBeTruthy();
    });
});
