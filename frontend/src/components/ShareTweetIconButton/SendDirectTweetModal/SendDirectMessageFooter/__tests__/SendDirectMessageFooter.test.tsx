import React from "react";
import IconButton from "@material-ui/core/IconButton";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { mockUsers } from "../../../../../util/test-utils/mock-test-data";
import SendDirectMessageFooter from "../SendDirectMessageFooter";
import { SendDirectMessageInput } from "../../SendDirectMessageInput";
import { ChatMessagesActionsType } from "../../../../../store/ducks/chatMessages/contracts/actionTypes";

describe("SendDirectMessageFooter", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockText = "mock_text";
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <SendDirectMessageFooter
                tweetId={1}
                selectedUsers={mockUsers}
                onSendMessageFinish={jest.fn()}
            />, mockRootState);
        wrapper.find(SendDirectMessageInput).find("textarea").at(0).simulate("change", { target: { value: mockText } });
        wrapper.find(IconButton).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {
                text: mockText,
                tweetId: 1,
                usersIds: [4, 1]
            },
            type: ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET
        });
    });
});
