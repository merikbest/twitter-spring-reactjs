import React from "react";
import {Button, IconButton, List, ListItem} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {mockFullTweet} from "../../../util/mockData/mockData";
import TweetComponentActionsModal from "../TweetComponentActionsModal/TweetComponentActionsModal";
import ChangeReplyWindow from "../../ChangeReplyWindow/ChangeReplyWindow";
import {TweetsActionType} from "../../../store/ducks/tweets/contracts/actionTypes";
import {ReplyType} from "../../../store/ducks/tweets/contracts/state";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";
import TweetComponentActions from "../TweetComponentActions";

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
