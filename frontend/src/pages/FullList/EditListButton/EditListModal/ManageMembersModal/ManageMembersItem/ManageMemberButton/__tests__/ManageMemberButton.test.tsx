import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../../../util/test-utils/test-helper";
import { mockListsOwnerMember } from "../../../../../../../../util/test-utils/mock-test-data";
import ManageMemberButton from "../ManageMemberButton";
import { LoadingStatus } from "../../../../../../../../types/common";
import { ListMembersActionsType } from "../../../../../../../../store/ducks/listMembers/contracts/actionTypes";

describe("ManageMemberButton", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockMember = mockListsOwnerMember[1];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should remove member from list", () => {
        const wrapper = mountWithStore(
            <ManageMemberButton
                userId={mockMember.id}
                listId={3}
                isMemberInList
                isSuggested
            />, mockStore);
        expect(wrapper.text().includes("Remove")).toBe(true);
        expect(wrapper.find(Button).prop("variant")).toBe("contained");
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 4, listId: 3, isSuggested: true },
            type: ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS
        });
    });

    it("should add member to list", () => {
        const wrapper = mountWithStore(
            <ManageMemberButton
                userId={mockMember.id}
                listId={3}
                isMemberInList={false}
                isSuggested
            />, mockStore);
        expect(wrapper.text().includes("Add")).toBe(true);
        expect(wrapper.find(Button).prop("variant")).toBe("outlined");
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 4, listId: 3, isSuggested: true },
            type: ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS
        });
    });
});
