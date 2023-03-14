import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import UserPrivateProfileMessage from "../UserPrivateProfileMessage";

describe("UserPrivateProfileMessage", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserPrivateProfileMessage />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes("These Tweets are protected")).toBe(true);
    });
});
