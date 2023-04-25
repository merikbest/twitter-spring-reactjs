import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../../types/common";
import { mockFollowerUserResponse } from "../../../../../../../util/test-utils/mock-test-data";
import UserRequestsAvatar from "../UserRequestsAvatar";
import { DEFAULT_PROFILE_IMG } from "../../../../../../../constants/url-constants";

describe("UserRequestsAvatar", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUser = mockFollowerUserResponse[0];

    it("should render user avatar", () => {
        const wrapper = mountWithStore(<UserRequestsAvatar avatar={mockUser.avatar} />, mockRootState);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar);
    });

    it("should render default avatar", () => {
        const wrapper = mountWithStore(<UserRequestsAvatar />, mockRootState);
        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
    });
});
