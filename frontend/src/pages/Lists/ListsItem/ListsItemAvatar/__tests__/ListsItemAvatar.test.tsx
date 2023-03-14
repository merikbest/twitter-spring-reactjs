import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { mockLists } from "../../../../../util/test-utils/mock-test-data";
import ListsItemAvatar from "../ListsItemAvatar";

describe("ListsItemAvatar", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockList = mockLists[0];

    it("should render ListsItemAvatar", () => {
        const wrapper = mountWithStore(
            <ListsItemAvatar
                listWallpaper={mockList.wallpaper}
                listAltWallpaper={mockList.altWallpaper}
            />, mockStore);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockList.altWallpaper);
    });
});
