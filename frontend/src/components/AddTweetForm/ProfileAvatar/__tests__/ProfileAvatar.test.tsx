import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ProfileAvatar from "../ProfileAvatar";
import { mockUser } from "../../../../util/test-utils/mock-test-data";

describe("ProfileAvatar", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ProfileAvatar />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockUser.avatar);
    });
});
