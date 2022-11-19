import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockUser} from "../../../../util/mockData/mockData";
import UserWallpaper from "../UserWallpaper";

describe("UserWallpaper", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserWallpaper/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockUser.wallpaper.src);
    });
});
