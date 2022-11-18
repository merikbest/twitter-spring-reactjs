import React from "react";
import {createMemoryHistory} from "history";
import {IconButton} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {MESSAGES} from "../../../../util/pathConstants";
import ActionIconButton from "../../../../components/ActionIconButton/ActionIconButton";
import {ChatsActionsType} from "../../../../store/ducks/chats/contracts/actionTypes";
import AddUserToChatButton from "../AddUserToChatButton";

describe("AddUserToChatButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should Click Add User To Chat", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<AddUserToChatButton/>, mockRootState, history);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {payload: 2, type: ChatsActionsType.CREATE_CHAT});
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(MESSAGES);
    });
});
