import React from "react";
import {Button, IconButton, Popover} from "@material-ui/core";
import {Picker} from "emoji-mart";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import {mockChats, mockMessages} from "../../../../util/mockData/mockData";
import {actionsInitialState} from "../../Messages";
import Spinner from "../../../../components/Spinner/Spinner";
import ChatMessages from "../ChatMessages";
import {MessageInput} from "../../MessageInput/MessageInput";
import {ChatMessagesActionsType} from "../../../../store/ducks/chatMessages/contracts/actionTypes";
import HoverAction from "../../../../components/HoverAction/HoverAction";

describe("ChatMessages", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockParticipant = mockChats[0].participants[0];
    const mockChatMessagesStore = {
        ...mockStore,
        chats: {...mockStore.chats, items: mockChats},
        chatMessages: {...mockStore.chatMessages, items: mockMessages},
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly no messages selected", () => {
        const wrapper = mountWithStore(
            <ChatMessages
                onOpenModalWindow={jest.fn()}
                handleHoverAction={jest.fn()}
                handleLeaveAction={jest.fn()}
                visibleHoverAction={actionsInitialState}
                chatEndRef={null}
            />,
            mockChatMessagesStore);

        expect(wrapper.text().includes("You don’t have a message selected")).toBe(true);
        expect(wrapper.text().includes("Choose one from your existing messages, or start a new one.")).toBe(true);
        expect(wrapper.find(Button).text().includes("New message")).toBe(true);
    });

    it("should render loading Spinner", () => {
        const mockStore = createMockRootState(LoadingStatus.LOADING);
        const mockChatMessagesStore = {
            ...mockStore,
            chats: {...mockStore.chats, items: mockChats},
            chatMessages: {...mockStore.chatMessages, items: mockMessages},
        };
        const wrapper = mountWithStore(
            <ChatMessages
                onOpenModalWindow={jest.fn()}
                handleHoverAction={jest.fn()}
                handleLeaveAction={jest.fn()}
                visibleHoverAction={actionsInitialState}
                chatEndRef={null}
                participant={mockParticipant}
            />,
            mockChatMessagesStore);

        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should open/close Popup", (done) => {
        const wrapper = mountWithStore(
            <ChatMessages
                onOpenModalWindow={jest.fn()}
                handleHoverAction={jest.fn()}
                handleLeaveAction={jest.fn()}
                visibleHoverAction={actionsInitialState}
                chatEndRef={null}
                participant={mockParticipant}
            />,
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
            <ChatMessages
                onOpenModalWindow={jest.fn()}
                handleHoverAction={jest.fn()}
                handleLeaveAction={jest.fn()}
                visibleHoverAction={actionsInitialState}
                chatEndRef={null}
                participant={mockParticipant}
                chat={mockChats[0]}
            />,
            mockChatMessagesStore);

        wrapper.find("#handleOpenPopup").simulate("click");
        wrapper.find(Popover).find(Picker).find("li").at(0).find("button").simulate("click");
        expect(wrapper.find(MessageInput).prop("value")).toBe(" 👍");
        
        wrapper.find(IconButton).at(4).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {chatId: 1, text: " :+1:"},
            type: ChatMessagesActionsType.ADD_CHAT_MESSAGE
        });
    });
    // |   91.54 |    54.95 |   57.14 |   91.04 | 133,320-374
});
