import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockUsers} from "../../../../util/mockData/mockData";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import UserItemAvatar from "../UserItemAvatar";

describe("UserItemAvatar", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUserAvatar = mockUsers[0].avatar;

    it("should render avatar", () => {
        const wrapper = mountWithStore(<UserItemAvatar userAvatar={mockUserAvatar}/>, mockRootState);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUserAvatar.src);
    });

    it("should render default avatar", () => {
        const wrapper = mountWithStore(<UserItemAvatar/>, mockRootState);
        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
    });
});
