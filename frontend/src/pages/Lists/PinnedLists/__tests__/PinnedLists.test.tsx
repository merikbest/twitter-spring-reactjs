import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import PinnedListsItem from "../PinnedListsItem/PinnedListsItem";
import { LoadingStatus } from "../../../../types/common";
import { mockLists, mockPinnedLists, mockSimpleList, mockUserLists } from "../../../../util/test-utils/mock-test-data";
import Spinner from "../../../../components/Spinner/Spinner";
import PinnedLists from "../PinnedLists";

describe("PinnedLists", () => {
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
        const wrapper = mountWithStore(<PinnedLists />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render PinnedLists correctly", () => {
        const wrapper = mountWithStore(<PinnedLists />, mockListsStore);
        expect(wrapper.find(PinnedListsItem).length).toEqual(1);
    });

    it("should render empty PinnedLists", () => {
        const wrapper = mountWithStore(<PinnedLists />, mockStore);
        expect(wrapper.text().includes("Nothing to see here yet — pin your favorite Lists to access them quickly.")).toBe(true);
    });
});
