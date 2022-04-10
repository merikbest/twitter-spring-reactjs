import React from "react";
import {Dialog} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../../util/testHelper";
import ManageMembersModal from "../ManageMembersModal";
import {LoadingStatus} from "../../../../../store/types";
import {mockFullList, mockListsOwnerMember} from "../../../../../util/mockData/mockData";
import {ListMembersActionsType} from "../../../../../store/ducks/listMembers/contracts/actionTypes";
import Spinner from "../../../../../components/Spinner/Spinner";
import ManageMembersItem from "../ManageMembersItem/ManageMembersItem";
import {ManageMembersInput} from "../ManageMembersInput/ManageMembersInput";

describe("ManageMembersModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListStore = {...mockStore, list: {...mockStore.list, list: mockFullList}};
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty Manage Members Modal window correctly", () => {
        const wrapper = mountWithStore(<ManageMembersModal visible={false} onClose={jest.fn()}/>, mockListStore);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render loading Manage Members Modal window correctly", () => {
        const wrapper = mountWithStore(<ManageMembersModal visible={true} onClose={jest.fn()}/>, {
            ...mockStore,
            list: {list: mockFullList, loadingState: LoadingStatus.LOADING},
            listMembers: {...mockStore.listMembers, membersLoadingState: LoadingStatus.LOADING}
        });

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(wrapper.text().includes("Manage members")).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes(`Members (${mockFullList.membersSize})`)).toBe(true);
        expect(wrapper.find(Tab).at(1).text().includes("Suggested")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {listId: 3, listOwnerId: 2},
            type: ListMembersActionsType.FETCH_LIST_MEMBERS
        });
    });

    it("should render list of ManageMembersItem", () => {
        const wrapper = mountWithStore(<ManageMembersModal visible={true} onClose={jest.fn()}/>, {
            ...mockListStore,
            listMembers: {
                ...mockStore.listMembers,
                members: mockListsOwnerMember,
                membersLoadingState: LoadingStatus.LOADED
            }
        });

        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(ManageMembersItem).length).toEqual(3);
    });

    it("should render empty list of Members", () => {
        const wrapper = mountWithStore(<ManageMembersModal visible={true} onClose={jest.fn()}/>, {
            ...mockListStore,
            listMembers: {...mockStore.listMembers, members: [], membersLoadingState: LoadingStatus.LOADED}
        });

        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(ManageMembersItem).length).toEqual(0);
        expect(wrapper.text().includes("There isn’t anyone in this List")).toBe(true);
        expect(wrapper.text().includes("When people get added, they’ll show up here.")).toBe(true);
    });

    it("should render list of suggested ManageMembersItem", () => {
        React.useState = jest.fn().mockReturnValue([1, jest.fn()]);
        const wrapper = mountWithStore(<ManageMembersModal visible={true} onClose={jest.fn()}/>, {
            ...mockListStore,
            listMembers: {
                ...mockStore.listMembers,
                suggested: mockListsOwnerMember,
                suggestedLoadingState: LoadingStatus.LOADED
            }
        });

        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(ManageMembersInput).exists()).toBe(true);
        expect(wrapper.find(ManageMembersItem).length).toEqual(3);
    });

    it("should render empty list of suggested Members", () => {
        React.useState = jest.fn().mockReturnValue([1, jest.fn()]);
        const wrapper = mountWithStore(<ManageMembersModal visible={true} onClose={jest.fn()}/>, {
            ...mockListStore,
            listMembers: {...mockStore.listMembers, suggested: [], suggestedLoadingState: LoadingStatus.LOADED}
        });

        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(ManageMembersInput).exists()).toBe(true);
        expect(wrapper.find(ManageMembersItem).length).toEqual(0);
        expect(wrapper.text().includes("There aren’t any suggested members")).toBe(true);
        expect(wrapper.text().includes("To see suggestions to add to this List, try searching for accounts.")).toBe(true);
    });

    it("should click on Members tab", () => {
        React.useState = jest.fn().mockReturnValue([0, jest.fn()]);
        const wrapper = mountWithStore(<ManageMembersModal visible={true} onClose={jest.fn()}/>, {
            ...mockListStore,
            listMembers: {
                ...mockStore.listMembers,
                members: mockListsOwnerMember,
                membersLoadingState: LoadingStatus.LOADED
            }
        });
        const tab = wrapper.find(Tab).at(0);
        tab.simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {listId: 3, listOwnerId: 2},
            type: ListMembersActionsType.FETCH_LIST_MEMBERS
        });
    });

    it("should search members by username", () => {
        React.useState = jest.fn().mockReturnValue([1, jest.fn()]);
        const wrapper = mountWithStore(<ManageMembersModal visible={true} onClose={jest.fn()}/>, {
            ...mockListStore,
            listMembers: {...mockStore.listMembers, suggested: [], suggestedLoadingState: LoadingStatus.LOADED}
        });
        const input = wrapper.find(ManageMembersInput).find("input").at(0);
        input.simulate("change", {target: {value: "test"}});

        expect(wrapper.find(ManageMembersInput).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: {listId: 3, username: "test"},
            type: ListMembersActionsType.FETCH_LIST_MEMBERS_BY_USERNAME
        });
    });

    it("should clear text input", () => {
        React.useState = jest.fn().mockReturnValue([1, jest.fn()]);
        const wrapper = mountWithStore(<ManageMembersModal visible={true} onClose={jest.fn()}/>, {
            ...mockListStore,
            listMembers: {...mockStore.listMembers, suggested: [], suggestedLoadingState: LoadingStatus.LOADED}
        });
        const input = wrapper.find(ManageMembersInput).find("input").at(0);
        input.simulate("change", {target: {value: undefined}});

        expect(wrapper.find(ManageMembersInput).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(2, {type: ListMembersActionsType.RESET_LIST_SUGGESTED_STATE});
    });

    it("should reset List Members State", () => {
        const wrapper = mountWithStore(<ManageMembersModal visible={true} onClose={jest.fn()}/>, mockListStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(2, {type: ListMembersActionsType.RESET_LIST_MEMBERS_STATE});
    });
});
