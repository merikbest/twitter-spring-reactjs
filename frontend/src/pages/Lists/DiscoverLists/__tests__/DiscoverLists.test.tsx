import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockLists, mockPinnedLists, mockSimpleList, mockUserLists } from "../../../../util/test-utils/mock-test-data";
import DiscoverLists from "../DiscoverLists";
import Spinner from "../../../../components/Spinner/Spinner";
import ListsItem from "../../ListsItem/ListsItem";

describe("DiscoverLists", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListsStore = {
        ...mockStore,
        lists: {
            ...mockStore.lists,
            lists: mockLists,
            userLists: mockUserLists,
            pinnedLists: mockPinnedLists,
            simpleLists: mockSimpleList
        }
    };

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<DiscoverLists />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(wrapper.text().includes("Show more")).toBe(true);
    });

    it("should render Lists", () => {
        const wrapper = mountWithStore(<DiscoverLists />, mockListsStore);
        expect(wrapper.find("#list").find(ListsItem).length).toEqual(3);
    });
});
