import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { mockUserFullList } from "../../../../../util/test-utils/mock-test-data";
import UnfollowListButton from "../UnfollowListButton";
import { ListsActionType } from "../../../../../store/ducks/lists/contracts/actionTypes";

describe("UnfollowListButton", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListDetail = { ...mockStore, listDetail: { ...mockStore.listDetail, item: mockUserFullList } };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click unfollow button", () => {
        const wrapper = mountWithStore(<UnfollowListButton />, mockListDetail);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 1, type: ListsActionType.UNFOLLOW_LIST });
    });

    it("should hover button", () => {
        const wrapper = mountWithStore(<UnfollowListButton />, mockListDetail);
        expect(wrapper.find(Button).at(0).text().includes("Following")).toBe(true);
        wrapper.find(Button).at(0).simulate("mouseover");
        expect(wrapper.find(Button).at(0).text().includes("Unfollow")).toBe(true);
        wrapper.find(Button).at(0).simulate("mouseleave");
        expect(wrapper.find(Button).at(0).text().includes("Following")).toBe(true);
    });
});
