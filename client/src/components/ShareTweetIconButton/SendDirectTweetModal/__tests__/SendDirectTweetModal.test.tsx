import React from "react";
import {Chip, Dialog, ListItem} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import InfiniteScroll from "react-infinite-scroll-component";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {mockChats, mockFullTweet, mockUsers} from "../../../../util/mockData/mockData";
import {ChatsActionsType} from "../../../../store/ducks/chats/contracts/actionTypes";
import {MessagesModalInput} from "../../../../pages/Messages/MessagesModal/MessagesModalInput/MessagesModalInput";
import {UsersSearchActionsType} from "../../../../store/ducks/usersSearch/contracts/actionTypes";
import SendDirectTweetModal, {DirectUserItems} from "../SendDirectTweetModal";
import {ChatMessagesActionsType} from "../../../../store/ducks/chatMessages/contracts/actionTypes";
import {SendDirectMessageInput} from "../SendDirectMessageInput";
import {LoadingStatus} from "../../../../store/types/common";

describe("SendDirectTweetModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockText = "mock_text";
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const {wrapper} = createWrapper();

        expect(mockDispatchFn).nthCalledWith(1, {type: ChatsActionsType.FETCH_CHATS});
        expect(wrapper.text().includes("Send Tweet")).toBe(true);
    });

    it("should search by text and cancel", () => {
        const {wrapper} = createWrapper();

        wrapper.find(MessagesModalInput).find("input").at(0).simulate("change", {target: {value: mockText}});
        expect(wrapper.find(MessagesModalInput).prop("value")).toBe(mockText);
        expect(wrapper.find(DirectUserItems).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(2, {type: UsersSearchActionsType.RESET_USERS_STATE});
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: {pageNumber: 0, username: mockText},
            type: UsersSearchActionsType.FETCH_PARTICIPANTS_BY_NAME
        });

        wrapper.find(MessagesModalInput).find("input").at(0).simulate("change", {target: {value: ""}});
        expect(wrapper.find(MessagesModalInput).prop("value")).toBe("");
    });

    it("should click select and click deselect user", () => {
        const {wrapper} = createWrapper();

        wrapper.find(MessagesModalInput).find("input").at(0).simulate("change", {target: {value: mockText}});
        wrapper.find(ListItem).at(0).simulate("click");
        expect(wrapper.find(ListItem).at(0).prop("selected")).toBe(true);

        wrapper.find(ListItem).at(0).simulate("click");
        expect(wrapper.find(ListItem).at(0).prop("selected")).toBe(false);
    });

    it("should click delete selected user", () => {
        const {wrapper} = createWrapper();

        expect(wrapper.find(Chip).exists()).toBeFalsy();

        wrapper.find(MessagesModalInput).find("input").at(0).simulate("change", {target: {value: mockText}});
        wrapper.find(ListItem).at(0).simulate("click");
        expect(wrapper.find(ListItem).at(0).prop("selected")).toBe(true);
        expect(wrapper.find(Chip).at(0).prop("label")).toBe(mockUsers[0].fullName);

        wrapper.find(Chip).at(0).find(CloseIcon).simulate("click");
        expect(wrapper.find(ListItem).at(0).prop("selected")).toBe(false);
    });

    it("should click Send Message", () => {
        const {wrapper, mockOnSendDirectTweet, mockCloseShareTweet, mockOnClose} = createWrapper();

        expect(wrapper.find(IconButton).at(1).prop("disabled")).toBe(true);

        wrapper.find(MessagesModalInput).find("input").at(0).simulate("change", {target: {value: mockText}});
        wrapper.find(SendDirectMessageInput).find("textarea").at(0).simulate("change", {target: {value: mockText}});
        wrapper.find(ListItem).at(0).simulate("click");
        expect(wrapper.find(IconButton).at(1).prop("disabled")).toBe(false);
        wrapper.find(IconButton).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(4, {
            payload: {
                text: mockText,
                tweetId: 9,
                usersIds: [4]
            },
            type: ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET
        });
        expect(mockOnSendDirectTweet).toHaveBeenCalled();
        expect(mockCloseShareTweet).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });

    it("should render chat participants", () => {
        const mockState = {
            ...mockRootState,
            usersSearch: {...mockRootState.usersSearch, users: []},
            chats: {...mockRootState.chats, items: mockChats}
        };
        const {wrapper} = createWrapper(mockState);

        expect(wrapper.find(DirectUserItems).length).toEqual(1);
    });

    it("should scroll list of Users by input text", () => {
        const mockState = {...mockRootState, usersSearch: {...mockRootState.usersSearch, pagesCount: 10}}
        const {wrapper} = createWrapper(mockState);
        wrapper.find(MessagesModalInput).find("input").at(0).simulate("change", {target: {value: mockText}});
        wrapper.find(InfiniteScroll).prop("next")();

        expect(mockDispatchFn).nthCalledWith(4, {
            payload: {username: mockText, pageNumber: 1},
            type: UsersSearchActionsType.FETCH_PARTICIPANTS_BY_NAME
        });
    });

    it("should render empty SendDirectTweetModal", () => {
        const {wrapper} = createWrapper(mockRootState, false);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should reset SendDirectTweetModal", () => {
        const {wrapper} = createWrapper(mockRootState);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, {type: UsersSearchActionsType.RESET_USERS_STATE});
    });

    const createWrapper = (mockState = mockRootState, visible = true) => {
        const mockOnSendDirectTweet = jest.fn();
        const mockCloseShareTweet = jest.fn();
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(
            <SendDirectTweetModal
                tweet={mockFullTweet}
                visible={visible}
                onSendDirectTweet={mockOnSendDirectTweet}
                closeShareTweet={mockCloseShareTweet}
                onClose={mockOnClose}
            />, mockState);

        return {wrapper, mockOnSendDirectTweet, mockCloseShareTweet, mockOnClose};
    };
});
