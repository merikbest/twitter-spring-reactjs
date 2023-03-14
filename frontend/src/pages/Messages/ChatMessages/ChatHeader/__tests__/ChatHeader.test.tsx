import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { mockMyProfile } from "../../../../../util/test-utils/mock-test-data";
import ChatHeader from "../ChatHeader";

describe("ChatHeader", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ChatHeader />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(Avatar).prop("src")).toEqual(mockMyProfile.avatar);
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(mockMyProfile.username)).toBe(true);
    });
});
