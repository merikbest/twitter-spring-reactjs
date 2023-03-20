import React from "react";
import { IconButton, Popover } from "@material-ui/core";
import { Picker } from "emoji-mart";
import { setImmediate } from "timers";

import { mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { mockChats } from "../../../../../util/test-utils/mock-test-data";
import { MessageInput } from "../../../MessageInput/MessageInput";
import { ChatMessagesActionsType } from "../../../../../store/ducks/chatMessages/contracts/actionTypes";
import ActionIcon from "../../../ActionIcon/ActionIcon";
import ChatFooter from "../ChatFooter";

describe("ChatFooter", () => {
    const mockChat = mockChats[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should open/close Popover", (done) => {
        const wrapper = mountWithStore(<ChatFooter chatId={mockChat.id} />);
        expect(wrapper.find(Popover).prop("open")).toBe(false);
        wrapper.find("#handleOpenPopup").simulate("click");
        expect(wrapper.find(Popover).prop("open")).toBe(true);
        // @ts-ignore
        wrapper.find(Popover).prop("onClose")(jest.fn());
        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(Popover).prop("open")).toBe(false);
        });
    });

    it("should send message", () => {
        const wrapper = mountWithStore(<ChatFooter chatId={mockChat.id} />);
        wrapper.find("#handleOpenPopup").simulate("click");
        wrapper.find(Popover).find(Picker).find("li").at(0).find("button").simulate("click");
        expect(wrapper.find(MessageInput).prop("value")).toBe(" 👍");
        wrapper.find(ActionIcon).at(3).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { chatId: 1, text: " :+1:" },
            type: ChatMessagesActionsType.ADD_CHAT_MESSAGE
        });
    });
});
