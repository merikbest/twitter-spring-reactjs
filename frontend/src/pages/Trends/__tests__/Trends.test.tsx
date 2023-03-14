import React from "react";

import Trends from "../Trends";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import Spinner from "../../../components/Spinner/Spinner";
import { TagsActionsType } from "../../../store/ducks/tags/contracts/actionTypes";
import { mockTags } from "../../../util/test-utils/mock-test-data";
import TrendsItem from "../TrendsItem/TrendsItem";
import { LoadingStatus } from "../../../types/common";

window.scrollTo = jest.fn();

describe("Trends", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<Trends />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { payload: 0, type: TagsActionsType.FETCH_TRENDS });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Trends />, {
            ...mockRootState,
            tags: { ...mockRootState.tags, trends: mockTags }
        });
        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(TrendsItem).length).toEqual(3);
    });

    it("should unmount Trends", () => {
        const wrapper = mountWithStore(<Trends />, createMockRootState());
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: TagsActionsType.RESET_TRENDS_STATE });
    });
});
