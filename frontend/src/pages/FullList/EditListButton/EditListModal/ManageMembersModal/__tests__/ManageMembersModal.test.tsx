import React from "react";
import { Dialog, IconButton } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import ManageMembersModal from "../ManageMembersModal";
import { mockFullList, mockListsOwnerMember } from "../../../../../../util/test-utils/mock-test-data";
import { ListMembersActionsType } from "../../../../../../store/ducks/listMembers/contracts/actionTypes";
import Spinner from "../../../../../../components/Spinner/Spinner";
import ManageMembersItem from "../ManageMembersItem/ManageMembersItem";
import { ManageMembersInput } from "../ManageMembersInput/ManageMembersInput";
import { LoadingStatus } from "../../../../../../types/common";

describe("ManageMembersModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListStore = { ...mockStore, list: { ...mockStore.list, list: mockFullList } };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should open/close ManageMembersModal", () => {
        const wrapper = mountWithStore(<ManageMembersModal />, mockListStore);
        expect(wrapper.find(Dialog).at(0).prop("open")).toBe(false);
        wrapper.find("#onOpenManageMembersModal").at(0).simulate("click");
        expect(wrapper.find(Dialog).at(0).prop("open")).toBe(true);
        wrapper.find(IconButton).at(0).simulate("click");
        expect(wrapper.find(Dialog).at(0).prop("open")).toBe(false);
    });

    it("should render loading Manage Members Modal window correctly", () => {
        const wrapper = mountWithStore(<ManageMembersModal />, {
            ...mockStore,
            list: { list: mockFullList, loadingState: LoadingStatus.LOADING },
            listMembers: { ...mockStore.listMembers, membersLoadingState: LoadingStatus.LOADING }
        });
        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        wrapper.find("#onOpenManageMembersModal").at(0).simulate("click");
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(wrapper.text().includes("Manage members")).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes(`Members (${mockFullList.membersSize})`)).toBe(true);
        expect(wrapper.find(Tab).at(1).text().includes("Suggested")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            type: ListMembersActionsType.RESET_LIST_MEMBERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            type: ListMembersActionsType.RESET_LIST_SUGGESTED_STATE
        });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { listId: 3, listOwnerId: 2 },
            type: ListMembersActionsType.FETCH_LIST_MEMBERS
        });
    });

    it("should render list of ManageMembersItem", () => {
        const wrapper = mountWithStore(<ManageMembersModal />, {
            ...mockListStore,
            listMembers: {
                ...mockStore.listMembers,
                members: mockListsOwnerMember,
                membersLoadingState: LoadingStatus.LOADED
            }
        });
        wrapper.find("#onOpenManageMembersModal").at(0).simulate("click");
        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(ManageMembersItem).length).toEqual(3);
    });

    it("should render empty list of Members", () => {
        const wrapper = mountWithStore(<ManageMembersModal />, {
            ...mockListStore,
            listMembers: { ...mockStore.listMembers, members: [], membersLoadingState: LoadingStatus.LOADED }
        });
        wrapper.find("#onOpenManageMembersModal").at(0).simulate("click");
        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(ManageMembersItem).length).toEqual(0);
        expect(wrapper.text().includes("There isn’t anyone in this List")).toBe(true);
        expect(wrapper.text().includes("When people get added, they’ll show up here.")).toBe(true);
    });

    it("should reset List Members State", () => {
        const wrapper = mountWithStore(<ManageMembersModal />, mockListStore);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(1, {
            type: ListMembersActionsType.RESET_LIST_MEMBERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            type: ListMembersActionsType.RESET_LIST_SUGGESTED_STATE
        });
    });

    it("should render list of suggested ManageMembersItem", () => {
        // React.useState = jest.fn().mockReturnValue([1, jest.fn()]);
        const wrapper = mountWithStore(<ManageMembersModal />, {
            ...mockListStore,
            listMembers: {
                ...mockStore.listMembers,
                suggested: mockListsOwnerMember,
                suggestedLoadingState: LoadingStatus.LOADED
            }
        });
        wrapper.find("#onOpenManageMembersModal").at(0).simulate("click");
        wrapper.find(Tab).at(1).simulate("click");
        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(ManageMembersInput).exists()).toBe(true);
        expect(wrapper.find(ManageMembersItem).length).toEqual(3);
    });

    it("should render empty list of suggested Members", () => {
        // React.useState = jest.fn().mockReturnValue([1, jest.fn()]);
        const wrapper = mountWithStore(<ManageMembersModal />, {
            ...mockListStore,
            listMembers: { ...mockStore.listMembers, suggested: [], suggestedLoadingState: LoadingStatus.LOADED }
        });
        wrapper.find("#onOpenManageMembersModal").at(0).simulate("click");
        wrapper.find(Tab).at(1).simulate("click");
        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(ManageMembersInput).exists()).toBe(true);
        expect(wrapper.find(ManageMembersItem).length).toEqual(0);
        expect(wrapper.text().includes("There aren’t any suggested members")).toBe(true);
        expect(wrapper.text().includes("To see suggestions to add to this List, try searching for accounts.")).toBe(true);
    });

    it("should click on Members tab", () => {
        // React.useState = jest.fn().mockReturnValue([1, jest.fn()]);
        const wrapper = mountWithStore(<ManageMembersModal />, {
            ...mockListStore,
            listMembers: {
                ...mockStore.listMembers,
                members: mockListsOwnerMember,
                membersLoadingState: LoadingStatus.LOADED
            }
        });
        wrapper.find("#onOpenManageMembersModal").at(0).simulate("click");
        wrapper.find(Tab).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { listId: 3, listOwnerId: 2 },
            type: ListMembersActionsType.FETCH_LIST_MEMBERS
        });
    });

    it("should search members by username", () => {
        // React.useState = jest.fn().mockReturnValue([1, jest.fn()]);
        const wrapper = mountWithStore(<ManageMembersModal />, {
            ...mockListStore,
            listMembers: { ...mockStore.listMembers, suggested: [], suggestedLoadingState: LoadingStatus.LOADED }
        });
        wrapper.find("#onOpenManageMembersModal").at(0).simulate("click");
        wrapper.find(Tab).at(1).simulate("click");
        wrapper.find(ManageMembersInput).find("input").at(0).simulate("change", { target: { value: "test" } });
        expect(wrapper.find(ManageMembersInput).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(4, {
            payload: { listId: 3, username: "test" },
            type: ListMembersActionsType.FETCH_LIST_MEMBERS_BY_USERNAME
        });
    });

    it("should clear text input", () => {
        // React.useState = jest.fn().mockReturnValue([1, jest.fn()]);
        const wrapper = mountWithStore(<ManageMembersModal />, {
            ...mockListStore,
            listMembers: { ...mockStore.listMembers, suggested: [], suggestedLoadingState: LoadingStatus.LOADED }
        });
        wrapper.find("#onOpenManageMembersModal").at(0).simulate("click");
        wrapper.find(Tab).at(1).simulate("click");
        wrapper.find(ManageMembersInput).find("input").at(0).simulate("change", { target: { value: undefined } });
        expect(wrapper.find(ManageMembersInput).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(2, { type: ListMembersActionsType.RESET_LIST_SUGGESTED_STATE });
    });
});
