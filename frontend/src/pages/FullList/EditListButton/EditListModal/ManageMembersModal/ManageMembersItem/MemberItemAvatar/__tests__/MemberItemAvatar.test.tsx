import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../../../../store/types/common";
import MemberItemAvatar from "../MemberItemAvatar";
import {mockUserProfile} from "../../../../../../../../util/mockData/mockData";
import {DEFAULT_PROFILE_IMG} from "../../../../../../../../util/url";

describe("MemberItemAvatar", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockAvatar = mockUserProfile.avatar;

    it("should render avatar", () => {
        const wrapper = mountWithStore(<MemberItemAvatar avatar={mockAvatar}/>, mockStore);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockAvatar.src);
    });

    it("should render default avatar", () => {
        const wrapper = mountWithStore(<MemberItemAvatar/>, mockStore);
        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
    });
});
