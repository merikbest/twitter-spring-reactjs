import React from "react";
import { Avatar, Button, Dialog, ListItem } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { mockSimpleList } from "../../../util/test-utils/mock-test-data";
import { ListsActionType } from "../../../store/ducks/lists/contracts/actionTypes";
import Spinner from "../../Spinner/Spinner";
import ListsModal from "../ListsModal";
import { LoadingStatus } from "../../../types/common";

describe("ListsModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockListsState = {
        ...mockRootState,
        lists: { ...mockRootState.lists, simpleLists: mockSimpleList, simpleListsLoadingState: LoadingStatus.LOADED }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<ListsModal userId={1} visible={true}
                                                   onClose={jest.fn()} />, createMockRootState(LoadingStatus.LOADING));

        expect(mockDispatchFn).toHaveBeenCalledWith({ payload: 1, type: ListsActionType.FETCH_SIMPLE_LISTS });

        expect(wrapper.text().includes("Pick a List")).toBe(true);
        expect(wrapper.text().includes("Create a new List")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Save")).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ListsModal userId={1} visible={true}
                                                   onClose={jest.fn()} />, mockListsState);

        expect(wrapper.find(ListItem).length).toEqual(1);
        expect(wrapper.find(ListItem).at(0).prop("selected")).toBe(true);
        expect(wrapper.text().includes(mockSimpleList[0].name)).toBe(true);
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockSimpleList[0].altWallpaper);
        expect(wrapper.find("#check").exists()).toBeTruthy();
    });

    it("should click on select", () => {
        const wrapper = mountWithStore(<ListsModal userId={1} visible={true}
                                                   onClose={jest.fn()} />, mockListsState);

        expect(wrapper.find(ListItem).at(0).prop("selected")).toBe(true);
        wrapper.find(ListItem).at(0).simulate("click");
        expect(wrapper.find(ListItem).at(0).prop("selected")).toBe(false);
    });

    it("should click submit", () => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<ListsModal userId={1} visible={true}
                                                   onClose={mockOnClose} />, mockListsState);

        wrapper.find(Button).at(0).simulate("submit");

        expect(mockDispatchFn).nthCalledWith(2, {
            payload: { userId: 1, lists: [{ isMemberInList: true, listId: 3 }] },
            type: ListsActionType.PROCESS_USER_TO_LISTS
        });
        expect(mockDispatchFn).nthCalledWith(3, { type: ListsActionType.RESET_LISTS_STATE });
        expect(mockOnClose).toHaveBeenCalled();
    });

    it("should render empty ListsModal", () => {
        const wrapper = mountWithStore(<ListsModal userId={1} visible={false}
                                                   onClose={jest.fn()} />, mockListsState);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
