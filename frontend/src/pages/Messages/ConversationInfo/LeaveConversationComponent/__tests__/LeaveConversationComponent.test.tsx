import React from "react";
import { createMemoryHistory } from "history";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import LeaveConversationComponent from "../LeaveConversationComponent";
import LeaveFromConversationModal from "../../LeaveFromConversationModal/LeaveFromConversationModal";
import { ChatsActionsType } from "../../../../../store/ducks/chats/contracts/actionTypes";
import { MESSAGES } from "../../../../../constants/path-constants";
import { LoadingStatus } from "../../../../../types/common";

describe("LeaveConversationComponent", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should open/close LeaveFromConversationModal", () => {
        const wrapper = mountWithStore(<LeaveConversationComponent participantId={1} chatId={1} />, mockStore);
        expect(wrapper.find(LeaveFromConversationModal).prop("visible")).toBe(false);
        wrapper.find("#leaveFromConversation").simulate("click");
        expect(wrapper.find(LeaveFromConversationModal).prop("visible")).toBe(true);
        wrapper.find(LeaveFromConversationModal).find(Button).at(1).simulate("click");
        expect(wrapper.find(LeaveFromConversationModal).prop("visible")).toBe(false);
    });

    it("should click Leave From Conversation", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<LeaveConversationComponent participantId={1} chatId={1} />, mockStore, history);
        wrapper.find("#leaveFromConversation").simulate("click");
        wrapper.find(LeaveFromConversationModal).find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { participantId: 1, chatId: 1 },
            type: ChatsActionsType.LEAVE_FROM_CONVERSATION
        });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({ pathname: MESSAGES, state: { removeParticipant: true } });
    });
});
