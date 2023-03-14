import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUser } from "../../../../util/test-utils/mock-test-data";
import UserAvatar from "../UserAvatar";

describe("UserAvatar", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserAvatar />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockUser.avatar);
    });
});
