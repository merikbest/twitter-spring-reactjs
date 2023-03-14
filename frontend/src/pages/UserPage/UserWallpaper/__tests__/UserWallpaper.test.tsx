import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUser } from "../../../../util/test-utils/mock-test-data";
import UserWallpaper from "../UserWallpaper";

describe("UserWallpaper", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserWallpaper />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockUser.wallpaper);
    });
});
