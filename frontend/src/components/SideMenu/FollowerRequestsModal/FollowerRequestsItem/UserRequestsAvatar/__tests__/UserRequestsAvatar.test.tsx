import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../../store/types/common";
import {mockFollowerUserResponse} from "../../../../../../util/mockData/mockData";
import UserRequestsAvatar from "../UserRequestsAvatar";
import {DEFAULT_PROFILE_IMG} from "../../../../../../util/url";

describe("UserRequestsAvatar", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUser = mockFollowerUserResponse[0];

    it("should render user avatar", () => {
        const wrapper = mountWithStore(<UserRequestsAvatar avatar={mockUser.avatar}/>, mockRootState);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar.src);
    });

    it("should render default avatar", () => {
        const wrapper = mountWithStore(<UserRequestsAvatar/>, mockRootState);
        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
    });
});
