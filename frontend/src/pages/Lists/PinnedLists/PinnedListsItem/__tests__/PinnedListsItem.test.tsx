import React from "react";
import ReactRouter from "react-router";
import { Avatar } from "@material-ui/core";
import { createMemoryHistory } from "history";
import { Link } from "react-router-dom";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { mockPinnedLists, mockUserFullList } from "../../../../../util/test-utils/mock-test-data";
import PinnedListsItem from "../PinnedListsItem";
import PopperListWindow from "../../../PopperListWindow/PopperListWindow";
import { LISTS } from "../../../../../constants/path-constants";
import { LoadingStatus } from "../../../../../types/common";

describe("PinnedListsItem", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockPinnedList = mockPinnedLists[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "2" });
    });

    it("should render PinnedListsItem correctly", () => {
        const wrapper = mountWithStore(<PinnedListsItem pinnedList={mockPinnedList} />, mockStore);

        expect(wrapper.find(Avatar).prop("src")).toEqual(mockPinnedList.altWallpaper);
        expect(wrapper.text().includes(mockPinnedList.name)).toBe(true);
    });

    it("should hover list info and render Popper List Window", () => {
        const mockListsStore = { ...mockStore, listDetail: { ...mockStore.listDetail, item: mockUserFullList } };
        jest.useFakeTimers();
        const wrapper = mountWithStore(<PinnedListsItem pinnedList={mockPinnedList} />, mockListsStore);
        wrapper.find("#pinnedListWrapper").at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(PopperListWindow).exists()).toBeTruthy();
        expect(wrapper.find(PopperListWindow).at(0).prop("visible")).toBe(true);
    });

    it("should redirect on click", () => {
        const mockPrivatePinnedList = { ...mockPinnedList, isPrivate: true };
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<PinnedListsItem pinnedList={mockPrivatePinnedList} />, mockStore, history);
        wrapper.find(Link).at(0).simulate("click", { button: 0 });

        expect(wrapper.find("#lockIcon").exists()).toBeTruthy();
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${LISTS}/${mockPinnedList.id}`);
    });
});
