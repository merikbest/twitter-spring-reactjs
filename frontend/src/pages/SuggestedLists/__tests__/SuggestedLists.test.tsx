import React from "react";

import SuggestedLists from "../SuggestedLists";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import Spinner from "../../../components/Spinner/Spinner";
import { ListsActionType } from "../../../store/ducks/lists/contracts/actionTypes";
import ListsItem from "../../Lists/ListsItem/ListsItem";
import { mockLists } from "../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../types/common";

window.scrollTo = jest.fn();

describe("SuggestedLists", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<SuggestedLists />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { type: ListsActionType.FETCH_LISTS });
    });

    it("should render empty list", () => {
        const wrapper = mountWithStore(<SuggestedLists />, mockRootState);
        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(mockDispatchFn).nthCalledWith(1, { type: ListsActionType.FETCH_LISTS });
        expect(wrapper.text().includes("Suggested Lists")).toBe(true);
        expect(wrapper.text().includes("Choose your Lists")).toBe(true);
        expect(wrapper.text().includes("Discover new Lists")).toBe(true);
        expect(wrapper.find(ListsItem).length).toEqual(0);
    });

    it("should render ListsItems", () => {
        const wrapper = mountWithStore(<SuggestedLists />, {
            ...mockRootState,
            lists: { ...mockRootState.lists, lists: mockLists }
        });
        expect(wrapper.find(ListsItem).length).toEqual(3);
    });
});
