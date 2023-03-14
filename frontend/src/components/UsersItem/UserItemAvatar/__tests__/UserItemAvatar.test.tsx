import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUsers } from "../../../../util/test-utils/mock-test-data";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import UserItemAvatar from "../UserItemAvatar";

describe("UserItemAvatar", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUserAvatar = mockUsers[0].avatar;

    it("should render avatar", () => {
        const wrapper = mountWithStore(<UserItemAvatar avatar={mockUserAvatar} />, mockRootState);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUserAvatar);
    });

    it("should render default avatar", () => {
        const wrapper = mountWithStore(<UserItemAvatar />, mockRootState);
        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
    });
});
