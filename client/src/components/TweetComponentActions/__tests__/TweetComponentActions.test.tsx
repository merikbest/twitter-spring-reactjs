import React from "react";
import {Button, ClickAwayListener, IconButton, List, ListItem} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {mockFullTweet} from "../../../util/mockData/mockData";
import TweetComponentActionsModal from "../TweetComponentActionsModal/TweetComponentActionsModal";
import ChangeReplyWindow from "../../ChangeReplyWindow/ChangeReplyWindow";
import {TweetsActionType} from "../../../store/ducks/tweets/contracts/actionTypes";
import {ReplyType} from "../../../store/ducks/tweets/contracts/state";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";
import TweetComponentActions from "../TweetComponentActions";
import {UserActionsType} from "../../../store/ducks/user/contracts/actionTypes";
import {TweetActionType} from "../../../store/ducks/tweet/contracts/actionTypes";
import {TweetResponse} from "../../../store/types/tweet";
import ListsModal from "../../ListsModal/ListsModal";
import CloseButton from "../../CloseButton/CloseButton";
import BlockUserModal from "../../BlockUserModal/BlockUserModal";
import {LoadingStatus} from "../../../store/types/common";

describe("TweetComponentActions", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render another user tweet actions", () => {
        const {wrapper} = createTweetComponentActionsWrapper();

        expect(wrapper.find(List).exists()).toBeFalsy();
        wrapper.find(IconButton).simulate("click");

        expect(wrapper.find(List).exists()).toBeTruthy();
        expect(wrapper.find("#muteIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes(`Mute @${mockFullTweet.user.username}`)).toBe(true);
        expect(wrapper.find("#blockIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes(`Block @${mockFullTweet.user.username}`)).toBe(true);
        expect(wrapper.text().includes("Embed Tweet")).toBe(true);
        expect(wrapper.text().includes("Report Tweet")).toBe(true);
    });

    it("should render my profile tweet actions", () => {
        const mockTweet = {...mockFullTweet, user: {...mockFullTweet.user, id: 2}}
        const {wrapper} = createTweetComponentActionsWrapper(mockTweet);

        expect(wrapper.find(List).exists()).toBeFalsy();
        wrapper.find(IconButton).simulate("click");

        expect(wrapper.find(List).exists()).toBeTruthy();
        expect(wrapper.text().includes("Delete")).toBe(true);
        expect(wrapper.text().includes("Pin to your profile")).toBe(true);
        expect(wrapper.text().includes(`Add/remove @${mockFullTweet.user.username} from Lists`)).toBe(true);
        expect(wrapper.text().includes("Change who can reply")).toBe(true);
        expect(wrapper.text().includes("Embed Tweet")).toBe(true);
        expect(wrapper.text().includes("View Tweet activity")).toBe(true);
    });

    it("should render unpin tweet action", () => {
        const mockTweet = {...mockFullTweet, id: 102, user: {...mockFullTweet.user, id: 2}}
        const {wrapper} = createTweetComponentActionsWrapper(mockTweet);

        wrapper.find(IconButton).simulate("click");
        expect(wrapper.text().includes("Unpin from profile")).toBe(true);
    });

    it("should click open and close Delete Tweet Component Actions Modal", () => {
        testTweetComponentActionsModal("#delete", "Delete");
    });

    it("should click open and close Pin Tweet Component Actions Modal", () => {
        testTweetComponentActionsModal("#pin", "Pin");
    });

    it("should click EVERYONE can reply", () => {
        testClickChangeReplyType(0, ReplyType.EVERYONE, "Everyone can reply now");
    });

    it("should click FOLLOW can reply", () => {
        testClickChangeReplyType(1, ReplyType.FOLLOW, "People you follow can reply now");
    });

    it("should click MENTION can reply", () => {
        testClickChangeReplyType(2, ReplyType.MENTION, "Only you can reply now");
    });

    it("should click Pin Tweet", () => {
        testPinTweet(102, "Your Tweet was unpinned from your profile");
    });

    it("should click Unpin Tweet", () => {
        testPinTweet(100, "Your Tweet was pinned to your profile.");
    });

    it("should click Delete Tweet", () => {
        const mockTweet = {...mockFullTweet, id: 102, user: {...mockFullTweet.user, id: 2}}
        testDeleteTweet(mockTweet, TweetsActionType.FETCH_DELETE_TWEET);
    });

    it("should click Delete Tweet Reply", () => {
        const mockTweet = {...mockFullTweet, id: 102, addressedTweetId: 123, user: {...mockFullTweet.user, id: 2}}
        testDeleteTweet(mockTweet, TweetActionType.DELETE_TWEET_REPLY);
    });

    it("should click follow user", () => {
        testClickFollow("#followIcon", "Follow", UserActionsType.FOLLOW_USER);
    });

    it("should click unfollow user", () => {
        const mockTweet = {...mockFullTweet, user: {...mockFullTweet.user, isFollower: true}}
        testClickFollow("#handleFollow", "Unfollow", UserActionsType.UNFOLLOW_USER, mockTweet);
    });

    it("should click open and close List Modal", () => {
        const {wrapper} = createTweetComponentActionsWrapper();

        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
        wrapper.find(IconButton).simulate("click");
        wrapper.find("#onOpenListsModal").at(0).simulate("click");
        
        expect(wrapper.find(ListsModal).prop("visible")).toBe(true);
        expect(wrapper.text().includes(`Add/remove @${mockFullTweet.user.username} from Lists`)).toBe(true);
        wrapper.find(ListsModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
    });

    it("should click Mute user", () => {
        testClickMuteUser("#muteIcon", "Mute", "muted");
    });

    it("should click Unmute user", () => {
        const mockTweet = {...mockFullTweet, user: {...mockFullTweet.user, isUserMuted: true}}
        testClickMuteUser("#unmuteIcon", "Unmute", "unmuted", mockTweet);
    });

    it("should click Block user", () => {
        testClickBlockUser("#blockIcon", "Block", "blocked");
    });

    it("should click Unblock user", () => {
        const mockTweet = {...mockFullTweet, user: {...mockFullTweet.user, isUserBlocked: true}}
        testClickBlockUser("#unblockIcon", "Unblock", "unblocked", mockTweet);
    });

    it("should click open and close BlockUserModal", () => {
        const {wrapper} = createTweetComponentActionsWrapper();

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
        wrapper.find(IconButton).simulate("click");
        wrapper.find("#onOpenBlockUserModal").at(0).simulate("click");

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);
        wrapper.find(BlockUserModal).find(Button).at(1).simulate("click");
        
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
    });
    
    it("should click away TweetComponentActions", () => {
        const {wrapper} = createTweetComponentActionsWrapper();
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());
        expect(wrapper.find(ClickAwayListener).exists()).toBeTruthy();
    });

    const testClickChangeReplyType = (listItem: number, replyType: ReplyType, snackbarText: string): void => {
        const mockTweet = {...mockFullTweet, id: 102, user: {...mockFullTweet.user, id: 2}}
        const {wrapper} = createTweetComponentActionsWrapper(mockTweet);

        expect(wrapper.find(ChangeReplyWindow).exists()).toBeFalsy();
        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(false);
        wrapper.find(IconButton).simulate("click");
        wrapper.find("#clickReplyDropdown").at(0).simulate("click");

        expect(wrapper.find(ChangeReplyWindow).exists()).toBeTruthy();
        wrapper.find(ChangeReplyWindow).find(ListItem).at(listItem).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {tweetId: 102, replyType: replyType},
            type: TweetsActionType.CHANGE_REPLY_TYPE
        });
        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe(snackbarText);
    };

    const testTweetComponentActionsModal = (itemId: string, modalTitle: string): void => {
        const mockTweet = {...mockFullTweet, id: 102, user: {...mockFullTweet.user, id: 2}}
        const {wrapper} = createTweetComponentActionsWrapper(mockTweet);

        expect(wrapper.find(TweetComponentActionsModal).prop("visibleTweetComponentActionsModal")).toBe(false);
        wrapper.find(IconButton).simulate("click");
        wrapper.find(itemId).at(0).simulate("click");

        expect(wrapper.find(TweetComponentActionsModal).prop("visibleTweetComponentActionsModal")).toBe(true);
        expect(wrapper.find(TweetComponentActionsModal).prop("modalTitle")).toBe(modalTitle);
        wrapper.find(TweetComponentActionsModal).find(Button).at(0).simulate("click");

        expect(wrapper.find(TweetComponentActionsModal).prop("visibleTweetComponentActionsModal")).toBe(false);
    };
    
    const testPinTweet = (tweetId: number, snackbarText: string): void => {
        const mockTweet = {...mockFullTweet, id: tweetId, user: {...mockFullTweet.user, id: 2}}
        const {wrapper} = createTweetComponentActionsWrapper(mockTweet);

        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(false);
        wrapper.find(IconButton).simulate("click");
        wrapper.find("#pin").at(0).simulate("click");
        wrapper.find(TweetComponentActionsModal).find(Button).at(1).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {payload: tweetId, type: UserActionsType.FETCH_PIN_TWEET});
        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe(snackbarText);
    };
    
    const testDeleteTweet = (mockTweet: any, actionType: TweetActionType | TweetsActionType): void => {
        const {wrapper} = createTweetComponentActionsWrapper(mockTweet);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#delete").at(0).simulate("click");
        wrapper.find(TweetComponentActionsModal).find(Button).at(1).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {payload: 102, type: actionType});
        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe("Your Tweet was deleted");
    };
    
    const testClickFollow = (iconIndex: string, text: string, actionType: UserActionsType, mockTweet?: TweetResponse): void => {
        const {wrapper} = createTweetComponentActionsWrapper(mockTweet);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#handleFollow").at(0).simulate("click");

        expect(wrapper.find(iconIndex).exists()).toBeTruthy();
        expect(wrapper.text().includes(`${text} @${mockFullTweet.user.username}`)).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {payload: { userId: 4, tweetId: 9 }, type: actionType});
    };
    
    const testClickMuteUser = (iconIndex: string, text: string, snackbarText: string, mockTweet?: TweetResponse): void => {
        const {wrapper} = createTweetComponentActionsWrapper(mockTweet);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#onMuteUser").at(0).simulate("click");

        expect(wrapper.find(iconIndex).exists()).toBeTruthy();
        expect(wrapper.text().includes(`${text} @${mockFullTweet.user.username}`)).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {payload: { userId: 4, tweetId: 9 }, type: UserActionsType.PROCESS_USER_TO_MUTELIST});
        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe(`@${mockFullTweet.user.username} has been ${snackbarText}.`);
    };
    
    const testClickBlockUser = (iconIndex: string, text: string, snackbarText: string, mockTweet?: TweetResponse): void => {
        const {wrapper} = createTweetComponentActionsWrapper(mockTweet);

        wrapper.find(IconButton).simulate("click");

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
        expect(wrapper.find(iconIndex).exists()).toBeTruthy();
        expect(wrapper.text().includes(`${text} @${mockFullTweet.user.username}`)).toBe(true);
        wrapper.find("#onOpenBlockUserModal").at(0).simulate("click");

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);

        wrapper.find(BlockUserModal).find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {payload: { userId: 4, tweetId: 9 }, type: UserActionsType.PROCESS_USER_TO_BLOCKLIST});
        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe(`@${mockFullTweet.user.username} has been ${snackbarText}.`);
    };

    const createTweetComponentActionsWrapper = (mockTweet = mockFullTweet, mockState = mockRootState) => {
        const wrapper = mountWithStore(
            <TweetComponentActions
                tweet={mockTweet}
                isFullTweet={true}
                onOpenTweetAnalytics={jest.fn()}
            />, mockState);

        return {wrapper};
    };
});
