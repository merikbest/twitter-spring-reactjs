import React from "react";
import { Button, IconButton, Popover } from "@material-ui/core";
import { Picker } from "emoji-mart";
import { setImmediate } from "timers";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockChats, mockMessages } from "../../../../util/test-utils/mock-test-data";
import Spinner from "../../../../components/Spinner/Spinner";
import ChatMessages from "../ChatMessages";
import { MessageInput } from "../../MessageInput/MessageInput";
import { ChatMessagesActionsType } from "../../../../store/ducks/chatMessages/contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

window.HTMLElement.prototype.scrollIntoView = () => {
};

describe("ChatMessages", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockChat = mockChats[0];
    const mockParticipant = mockChats[0].participants[0];
    const mockChatMessagesStore = {
        ...mockStore,
        chats: { ...mockStore.chats, items: mockChats },
        chatMessages: { ...mockStore.chatMessages, items: mockMessages }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly no messages selected", () => {
        const wrapper = mountWithStore(
            <ChatMessages chatId={mockChat.id} />,
            mockChatMessagesStore);

        expect(wrapper.text().includes("You don’t have a message selected")).toBe(true);
        expect(wrapper.text().includes("Choose one from your existing messages, or start a new one.")).toBe(true);
        expect(wrapper.find(Button).text().includes("New message")).toBe(true);
    });

    it("should render loading Spinner", () => {
        const mockStore = createMockRootState(LoadingStatus.LOADING);
        const mockChatMessagesStore = {
            ...mockStore,
            chats: { ...mockStore.chats, items: mockChats },
            chatMessages: { ...mockStore.chatMessages, items: mockMessages }
        };
        const wrapper = mountWithStore(
            <ChatMessages participantId={mockParticipant.id} chatId={mockChat.id} />,
            mockChatMessagesStore);

        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should open/close Popup", (done) => {
        const wrapper = mountWithStore(
            <ChatMessages participantId={mockParticipant.id} chatId={mockChat.id} />,
            mockChatMessagesStore);
        expect(wrapper.find(Popover).prop("open")).toBe(false);
        expect(wrapper.find(Popover).prop("id")).toBe(undefined);

        wrapper.find("#handleOpenPopup").simulate("click");
        expect(wrapper.find(Popover).prop("open")).toBe(true);
        expect(wrapper.find(Popover).prop("id")).toBe("simple-popover");

        // @ts-ignore
        wrapper.find(Popover).prop("onClose")(jest.fn());
        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(Popover).prop("open")).toBe(false);
            expect(wrapper.find(Popover).prop("id")).toBe(undefined);
        });
    });

    it("should add Emoji and send message", () => {
        const wrapper = mountWithStore(
            <ChatMessages participantId={mockParticipant.id} chatId={mockChat.id} />,
            mockChatMessagesStore);

        wrapper.find("#handleOpenPopup").simulate("click");
        wrapper.find(Popover).find(Picker).find("li").at(0).find("button").simulate("click");
        expect(wrapper.find(MessageInput).prop("value")).toBe(" 👍");

        wrapper.find(IconButton).at(4).simulate("click");
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: { chatId: 1, text: " :+1:" },
            type: ChatMessagesActionsType.ADD_CHAT_MESSAGE
        });
    });

    it("should unmount ChatMessages", () => {
        const wrapper = mountWithStore(
            <ChatMessages participantId={mockParticipant.id} chatId={mockChat.id} />,
            mockChatMessagesStore);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(5, { type: ChatMessagesActionsType.RESET_CHAT_MESSAGES });
    });
});
