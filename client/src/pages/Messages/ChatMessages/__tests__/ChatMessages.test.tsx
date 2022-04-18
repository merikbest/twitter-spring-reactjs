import React, {useRef} from "react";
import {Avatar, Button} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import {mockChats, mockMessages} from "../../../../util/mockData/mockData";
import Messages, {actionsInitialState, VisibleActions} from "../../Messages";
import Spinner from "../../../../components/Spinner/Spinner";
import {ChatsActionsType} from "../../../../store/ducks/chats/contracts/actionTypes";
import ChatMessages from "../ChatMessages";

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

});
