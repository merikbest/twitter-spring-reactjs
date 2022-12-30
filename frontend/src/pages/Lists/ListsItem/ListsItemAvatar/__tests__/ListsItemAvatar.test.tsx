import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types/common";
import {mockLists} from "../../../../../util/mockData/mockData";
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
