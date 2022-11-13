import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import FullListWallpaper from "../FullListWallpaper";
import {mockFullList} from "../../../../util/mockData/mockData";
import {LoadingStatus} from "../../../../store/types/common";

describe("FullListWallpaper", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const mockState = {...mockRootState, list: {...mockRootState.list, list: mockFullList}};
        const wrapper = mountWithStore(<FullListWallpaper/>, mockState);
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockFullList.altWallpaper);
    });
});
