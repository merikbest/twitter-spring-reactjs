import React from "react";
import routeData from "react-router";
import {ClickAwayListener, IconButton} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {mockFullTweet} from "../../../util/mockData/mockData";
import SendDirectTweetModal from "../SendDirectTweetModal/SendDirectTweetModal";
import CloseButton from "../../CloseButton/CloseButton";
import {TweetActionType} from "../../../store/ducks/tweet/contracts/actionTypes";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";
import {TweetsActionType} from "../../../store/ducks/tweets/contracts/actionTypes";
import {BOOKMARKS} from "../../../util/pathConstants";
import {HoverActions} from "../../../hoc/withHoverAction";
import ShareTweet from "../ShareTweet";

describe("ShareTweet", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click Icon Button and render correctly", () => {
        const wrapper = mountWithStore(<ShareTweet tweet={mockFullTweet} isFullTweet={false}/>, mockRootState);

        wrapper.find(IconButton).simulate("click");

        expect(wrapper.text().includes("Send via Direct Message")).toBe(true);
        expect(wrapper.text().includes("Add Tweet to Bookmarks")).toBe(true);
        expect(wrapper.text().includes("Copy link to Tweet")).toBe(true);
        expect(wrapper.text().includes("Share Tweet via ...")).toBe(true);
        expect(wrapper.find(IconButton).prop("size")).toBe("small");
    });

    it("should click open and close Send Via Direct Message modal", () => {
        const wrapper = mountWithStore(<ShareTweet tweet={mockFullTweet} isFullTweet={false}/>, mockRootState);

        expect(wrapper.find(SendDirectTweetModal).prop("visible")).toBe(false);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#clickSendViaDirectMessage").at(0).simulate("click");

        expect(wrapper.find(SendDirectTweetModal).prop("visible")).toBe(true);

        wrapper.find(SendDirectTweetModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(SendDirectTweetModal).prop("visible")).toBe(false);
    });

    it("should click Copy Link To Tweet", () => {
        const wrapper = mountWithStore(<ShareTweet tweet={mockFullTweet} isFullTweet={false}/>, mockRootState);

        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(false);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#copyLinkToTweet").at(0).simulate("click");

        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe("Copied to clipboard");
    });

    it("should click add tweet to Bookmarks", () => {
        const wrapper = mountWithStore(<ShareTweet tweet={mockFullTweet} isFullTweet={false}/>, mockRootState);

        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(false);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#clickAddTweetToBookmarks").at(0).simulate("click");

        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe("Tweet added to your Bookmarks");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: 9,
            type: TweetActionType.ADD_TWEET_TO_BOOKMARKS
        });
    });

    it("should click remove tweet from Bookmarks", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: BOOKMARKS,
            hash: "",
            search: "",
            state: undefined
        });
        const wrapper = mountWithStore(
            <ShareTweet
                tweet={{...mockFullTweet, isTweetBookmarked: true}}
                isFullTweet={false}
            />, mockRootState);

        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(false);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#clickAddTweetToBookmarks").at(0).simulate("click");

        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe("Tweet removed to your Bookmarks");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: 9,
            type: TweetActionType.ADD_TWEET_TO_BOOKMARKS
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: 9,
            type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS
        });
    });

    it("should onMouseEnter and onMouseLeave IconButton", () => {
        const mockHandleHoverAction = jest.fn();
        const mockHandleLeaveAction = jest.fn();

        jest.useFakeTimers();
        const wrapper = mountWithStore(
            <ShareTweet
                tweet={mockFullTweet}
                isFullTweet={false}
                handleHoverAction={mockHandleHoverAction}
                handleLeaveAction={mockHandleLeaveAction}
            />, mockRootState);

        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(mockHandleHoverAction).toHaveBeenCalled();
        expect(mockHandleHoverAction).toHaveBeenCalledWith(HoverActions.SHARE);

        wrapper.find(IconButton).simulate("mouseleave");

        expect(mockHandleLeaveAction).toHaveBeenCalled();
    });

    it("should render medium size IconButton", () => {
        const wrapper = mountWithStore(<ShareTweet tweet={mockFullTweet} isFullTweet={true}/>, mockRootState);
        expect(wrapper.find(IconButton).prop("size")).toBe("medium");
    });

    it("should click away ShareTweet", () => {
        const wrapper = mountWithStore(<ShareTweet tweet={mockFullTweet} isFullTweet={false}/>, mockRootState);
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());

        expect(wrapper.find(ClickAwayListener).exists()).toBeTruthy();
    });
});
