import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { mockUserFullList } from "../../../../../util/test-utils/mock-test-data";
import { ListsActionType } from "../../../../../store/ducks/lists/contracts/actionTypes";
import FollowListButton from "../FollowListButton";
import { LoadingStatus } from "../../../../../types/common";

describe("FollowListButton", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListDetail = { ...mockStore, listDetail: { item: mockUserFullList } };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click follow to list", () => {
        const wrapper = mountWithStore(<FollowListButton />, mockListDetail);
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 1, type: ListsActionType.FOLLOW_LIST });
    });
});
