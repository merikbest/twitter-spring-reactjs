import React from "react";
import { Dialog } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import MembersAndFollowersModal from "../MembersAndFollowersModal";
import { mockFullList, mockListsOwnerMember } from "../../../../../util/test-utils/mock-test-data";
import Spinner from "../../../../../components/Spinner/Spinner";
import { ListMembersActionsType } from "../../../../../store/ducks/listMembers/contracts/actionTypes";
import ManageMembersItem
    from "../../../EditListButton/EditListModal/ManageMembersModal/ManageMembersItem/ManageMembersItem";
import { LoadingStatus } from "../../../../../types/common";

describe("MembersAndFollowersModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty Members And Followers Modal Window correctly", () => {
        const wrapper = mountWithStore(
            <MembersAndFollowersModal
                listId={mockFullList.id}
                listOwnerId={mockFullList.listOwner.id}
                visible={false}
                title={"List members"}
                onClose={jest.fn()}
            />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render loading Spinner and fetch members", () => {
        const wrapper = mountWithStore(
            <MembersAndFollowersModal
                listId={mockFullList.id}
                listOwnerId={mockFullList.listOwner.id}
                visible={true}
                title={"List members"}
                onClose={jest.fn()}
            />, createMockRootState(LoadingStatus.LOADING));

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("List members")).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { listId: 3, listOwnerId: 2 },
            type: ListMembersActionsType.FETCH_LIST_MEMBERS
        });
    });

    it("should render loading Spinner and fetch followers", () => {
        const wrapper = mountWithStore(
            <MembersAndFollowersModal
                listId={mockFullList.id}
                listOwnerId={mockFullList.listOwner.id}
                visible={true}
                title={"List followers"}
                onClose={jest.fn()}
            />, createMockRootState(LoadingStatus.LOADING));

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("List followers")).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { listId: 3, listOwnerId: 2 },
            type: ListMembersActionsType.FETCH_LIST_FOLLOWERS
        });
    });

    it("should render list ManageMembersItem", () => {
        const wrapper = mountWithStore(
            <MembersAndFollowersModal
                listId={mockFullList.id}
                listOwnerId={mockFullList.listOwner.id}
                visible={true}
                title={"List followers"}
                onClose={jest.fn()}
            />, {
                ...mockStore,
                listMembers: {
                    ...mockStore.listMembers,
                    members: mockListsOwnerMember,
                    membersLoadingState: LoadingStatus.LOADED
                }
            });

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.find(ManageMembersItem).length).toEqual(3);
    });

    it("should render empty list members message", () => {
        const wrapper = mountWithStore(
            <MembersAndFollowersModal
                listId={mockFullList.id}
                listOwnerId={mockFullList.listOwner.id}
                visible={true}
                title={"List members"}
                onClose={jest.fn()}
            />, {
                ...mockStore,
                listMembers: {
                    ...mockStore.listMembers,
                    members: [],
                    membersLoadingState: LoadingStatus.LOADED
                }
            });

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("There isn’t anyone in this List")).toBe(true);
        expect(wrapper.text().includes("When people get added, they’ll show up here.")).toBe(true);
    });

    it("should render empty list followers message", () => {
        const wrapper = mountWithStore(
            <MembersAndFollowersModal
                listId={mockFullList.id}
                listOwnerId={mockFullList.listOwner.id}
                visible={true}
                title={"List followers"}
                onClose={jest.fn()}
            />, {
                ...mockStore,
                listMembers: {
                    ...mockStore.listMembers,
                    members: [],
                    membersLoadingState: LoadingStatus.LOADED
                }
            });

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("There aren’t any followers of this List")).toBe(true);
        expect(wrapper.text().includes("When people follow, they’ll show up here.")).toBe(true);
    });

    it("should click on Dialog window", () => {
        const wrapper = mountWithStore(
            <MembersAndFollowersModal
                listId={mockFullList.id}
                listOwnerId={mockFullList.listOwner.id}
                visible={true}
                title={"List followers"}
                onClose={jest.fn()}
            />, mockStore);
        wrapper.find(Dialog).simulate("click");

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
    });

    it("should unmount MembersAndFollowersModal", () => {
        const wrapper = mountWithStore(
            <MembersAndFollowersModal
                listId={mockFullList.id}
                listOwnerId={mockFullList.listOwner.id}
                visible={false}
                title={"List members"}
                onClose={jest.fn()}
            />, mockStore);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(1, { type: ListMembersActionsType.RESET_LIST_MEMBERS_STATE });
    });
});
