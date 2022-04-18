import React from "react";
import {Link} from "react-router-dom";
import routeData from "react-router";
import {createMemoryHistory} from "history";
import {Avatar, Button, IconButton, ListItem} from "@material-ui/core";

import Messages from "../Messages";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import Spinner from "../../../components/Spinner/Spinner";
import {ChatsActionsType} from "../../../store/ducks/chats/contracts/actionTypes";
import {mockChats} from "../../../util/mockData/mockData";
import {ChatMessagesActionsType} from "../../../store/ducks/chatMessages/contracts/actionTypes";
import {UserActionsType} from "../../../store/ducks/user/contracts/actionTypes";
import ChatMessages from "../ChatMessages/ChatMessages";
import MessagesModal from "../MessagesModal/MessagesModal";
import CloseButton from "../../../components/CloseButton/CloseButton";
import ConversationInfo from "../ConversationInfo/ConversationInfo";
import BlockUserModal from "../../../components/BlockUserModal/BlockUserModal";
import HoverAction from "../../../components/HoverAction/HoverAction";
import {MessageInput} from "../MessageInput/MessageInput";
import {PeopleSearchInput} from "../PeopleSearchInput/PeopleSearchInput";

window.scrollTo = jest.fn();

describe("Messages", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockChatsStore = {...mockStore, chats: {...mockStore.chats, items: mockChats}};
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Messages/>, createMockRootState());

        expect(wrapper.text().includes("Messages")).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {type: ChatsActionsType.FETCH_CHATS});
    });

    it("should render empty chat", () => {
        const wrapper = mountWithStore(<Messages/>, {...mockStore, chats: {...mockStore.chats, items: []}});

        expect(wrapper.text().includes("Send a message, get a message")).toBe(true);
        expect(wrapper.text().includes("Direct Messages are private conversations between you and other people on Twitter.")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Start a conversation")).toBe(true);
    });

    it("should search people", () => {
        const wrapper = mountWithStore(<Messages/>, mockChatsStore);
        wrapper.find(PeopleSearchInput).find("input").at(0).simulate("change", {target: {value: "test"}});

        expect(wrapper.find(PeopleSearchInput).prop("value")).toBe("test");
    });

    it("should render chats", () => {
        const wrapper = mountWithStore(<Messages/>, mockChatsStore);

        expect(wrapper.find(Avatar).prop("src")).toBe(mockChats[0].participants[0].user.avatar.src);
        expect(wrapper.text().includes(mockChats[0].participants[0].user.fullName)).toBe(true);
        expect(wrapper.text().includes(`${mockChats[0].participants[0].user.username}`)).toBe(true);
    });

    it("should fetch chat messages", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<Messages/>, mockChatsStore, history);
        wrapper.find(ListItem).at(0).simulate("click");

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith("/messages");
        expect(wrapper.find(ListItem).at(0).prop("id")).toBe("selected");
        expect(mockDispatchFn).nthCalledWith(1, {type: ChatsActionsType.FETCH_CHATS});
        expect(mockDispatchFn).nthCalledWith(2, {type: ChatMessagesActionsType.RESET_CHAT_MESSAGES});
        expect(mockDispatchFn).nthCalledWith(3, {payload: 1, type: ChatMessagesActionsType.FETCH_CHAT_MESSAGES});
        expect(mockDispatchFn).nthCalledWith(4, {payload: 1, type: UserActionsType.FETCH_READ_MESSAGES});
        expect(mockDispatchFn).nthCalledWith(5, {payload: 1, type: ChatMessagesActionsType.FETCH_CHAT_MESSAGES});
        expect(mockDispatchFn).nthCalledWith(6, {payload: 1, type: UserActionsType.FETCH_READ_MESSAGES});
    });

    it("should reset chat participant", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "/home", hash: "", search: "", state: {removeParticipant: true}
        });
        mountWithStore(<Messages/>, mockChatsStore);

        expect(mockDispatchFn).nthCalledWith(2, {type: ChatMessagesActionsType.RESET_CHAT_MESSAGES});
    });

    it("should click open/close MessagesModal", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "/messages", hash: "", search: "", state: {removeParticipant: true}
        });
        const history = createMemoryHistory({
            initialEntries: [{
                pathname: "/messages",
                search: "",
                hash: "",
                state: undefined
            }]
        });
        const wrapper = mountWithStore(<Messages/>, mockChatsStore, history);

        wrapper.find(ChatMessages).find(Button).at(0).simulate("click");
        expect(wrapper.find(MessagesModal).prop("visible")).toBe(true);

        wrapper.find(MessagesModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(MessagesModal).prop("visible")).toBe(false);
    });

    it("should click block participant", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "/messages", hash: "", search: "", state: {removeParticipant: true}
        });
        const history = createMemoryHistory({
            initialEntries: [{
                pathname: "/messages",
                search: "",
                hash: "",
                state: undefined
            }]
        });
        const wrapper = mountWithStore(<Messages/>, mockChatsStore, history);
        wrapper.find(ListItem).at(0).simulate("click");
        wrapper.find(ChatMessages).find(Link).at(0).simulate("click", {button: 0});
        wrapper.find(ConversationInfo).find("#onOpenBlockUserModal").simulate("click");
        wrapper.find(ConversationInfo).find(BlockUserModal).find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(6, {
            payload: {userId: 2},
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
    });

    it("should hover Settings icon and render Hover Action", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "/messages", hash: "", search: "", state: {removeParticipant: true}
        });
        jest.useFakeTimers();
        const wrapper = mountWithStore(<Messages/>, mockChatsStore);
        wrapper.find(IconButton).at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(0).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(0).prop("actionText")).toBe("Settings");
    });

    it("should hover New Message icon and render Hover Action", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "/messages", hash: "", search: "", state: {removeParticipant: true}
        });
        jest.useFakeTimers();
        const wrapper = mountWithStore(<Messages/>, mockChatsStore);
        wrapper.find(IconButton).at(1).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(1).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(1).prop("actionText")).toBe("New message");
    });

    it("should hover Details icon and render Hover Action", () => {
        processHoverAction(0, "Details");
    });

    it("should hover Media icon and render Hover Action", () => {
        processHoverAction(1, "Media");
    });

    it("should hover Gif icon and render Hover Action", () => {
        processHoverAction(2, "GIF");
    });

    it("should hover Emoji icon and render Hover Action", () => {
        processHoverAction(3, "Emoji");
    });

    it("should hover Send icon and render Hover Action", () => {
        processHoverAction(4, "Send");
    });

    it("should reset Messages State", () => {
        const wrapper = mountWithStore(<Messages/>, mockChatsStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(3, {type: ChatsActionsType.RESET_CHATS_STATE});
    });
    
    const processHoverAction = (actionIndex: number, actionText: string): void => {
        jest.useFakeTimers();
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "/messages", hash: "", search: "", state: {removeParticipant: true}
        });
        const history = createMemoryHistory({
            initialEntries: [{
                pathname: "/messages",
                search: "",
                hash: "",
                state: undefined
            }]
        });
        const wrapper = mountWithStore(<Messages/>, mockChatsStore, history);
        wrapper.find(ListItem).at(0).simulate("click");
        wrapper.find(ChatMessages).find(MessageInput).find("textarea").at(0).simulate("change", {target: {value: "test"}});
        wrapper.find(ChatMessages).find(IconButton).at(actionIndex).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(ChatMessages).find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(ChatMessages).find(HoverAction).at(actionIndex).prop("visible")).toBe(true);
        expect(wrapper.find(ChatMessages).find(HoverAction).at(actionIndex).prop("actionText")).toBe(actionText);
    };
});
