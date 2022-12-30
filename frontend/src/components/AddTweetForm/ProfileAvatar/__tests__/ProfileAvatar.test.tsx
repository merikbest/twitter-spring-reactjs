import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import ProfileAvatar from "../ProfileAvatar";
import {mockUser} from "../../../../util/mockData/mockData";

describe("ProfileAvatar", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ProfileAvatar/>, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockUser.avatar.src);
    });
});
