import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../../../types/common";
import MemberItemAvatar from "../MemberItemAvatar";
import { mockUserProfile } from "../../../../../../../../util/test-utils/mock-test-data";
import { DEFAULT_PROFILE_IMG } from "../../../../../../../../constants/url-constants";

describe("MemberItemAvatar", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockAvatar = mockUserProfile.avatar;

    it("should render avatar", () => {
        const wrapper = mountWithStore(<MemberItemAvatar avatar={mockAvatar} />, mockStore);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockAvatar);
    });

    it("should render default avatar", () => {
        const wrapper = mountWithStore(<MemberItemAvatar />, mockStore);
        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
    });
});
