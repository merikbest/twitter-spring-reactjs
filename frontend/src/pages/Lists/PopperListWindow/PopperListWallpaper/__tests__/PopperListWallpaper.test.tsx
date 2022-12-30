import React from "react";

import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types/common";
import {mockUserFullList} from "../../../../../util/mockData/mockData";
import PopperListWallpaper from "../PopperListWallpaper";

describe("PopperListWallpaper", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListDetail = {...mockStore, listDetail: {...mockStore.listDetail, item: mockUserFullList}};

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PopperListWallpaper/>, mockListDetail);
        expect(wrapper.find("img").prop("src")).toBe(mockUserFullList.altWallpaper);
    });
});
