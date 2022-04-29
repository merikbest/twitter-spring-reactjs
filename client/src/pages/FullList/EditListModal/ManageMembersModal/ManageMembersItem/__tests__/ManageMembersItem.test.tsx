import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Button} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../../../util/testHelper";
import ManageMembersItem from "../ManageMembersItem";
import {mockFullList, mockListsOwnerMember} from "../../../../../../util/mockData/mockData";
import {LoadingStatus} from "../../../../../../store/types";
import {ListMembersActionsType} from "../../../../../../store/ducks/listMembers/contracts/actionTypes";
import ActionSnackbar from "../../../../../../components/ActionSnackbar/ActionSnackbar";
import PopperUserWindow from "../../../../../../components/PopperUserWindow/PopperUserWindow";
import {PROFILE} from "../../../../../../util/pathConstants";

describe("ManageMembersItem", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockMember = mockListsOwnerMember[1];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render Manage Members Item correctly", () => {
        const wrapper = mountWithStore(<ManageMembersItem item={mockFullList} member={mockMember}/>, mockStore);

        expect(wrapper.find(Link).prop("to")).toBe(`${PROFILE}/${mockMember.id}`);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockMember.avatar.src);
        expect(wrapper.text().includes(mockMember.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMember.username}`)).toBe(true);
        expect(wrapper.text().includes(mockMember.about)).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Add");
    });

    it("should click Add Member to list", () => {
        const wrapper = mountWithStore(<ManageMembersItem item={mockFullList} member={mockMember}/>, mockStore);
        const buttonAddMember = wrapper.find(Button).at(0);
        buttonAddMember.simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {userId: 4, listId: 3},
            type: ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS
        });
    });

    it("should click Remove Member from list", () => {
        const mockMember = mockListsOwnerMember[2];
        const wrapper = mountWithStore(<ManageMembersItem item={mockFullList} member={mockMember}/>, mockStore);
        const buttonAddMember = wrapper.find(Button).at(0);
        buttonAddMember.simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {userId: 5, listId: 3},
            type: ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS
        });
    });

    it("should render Action Snackbar", () => {
        const wrapper = mountWithStore(<ManageMembersItem item={mockFullList} member={mockMember}/>, {
            ...mockStore,
            listMembers: {...mockStore.listMembers, suggestedLoadingState: LoadingStatus.ERROR}
        });

        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.text().includes("You aren’t allowed to add this member to this List.")).toBe(true);
    });

    it("should hover Member", () => {
        const wrapper = mountWithStore(<ManageMembersItem item={mockFullList} member={mockMember}/>, mockStore);
        const memberFullName = wrapper.find("#fullName").at(0);
        memberFullName.simulate("mouseenter");

        expect(wrapper.find(PopperUserWindow).exists()).toBeTruthy();
    });
});
