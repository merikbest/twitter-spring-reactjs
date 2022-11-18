import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockUser} from "../../../../util/mockData/mockData";
import UserAvatar from "../UserAvatar";

describe("UserAvatar", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserAvatar/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockUser.avatar.src);
    });
});
