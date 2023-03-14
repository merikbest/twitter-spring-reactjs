import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUserDetailResponse } from "../../../../util/test-utils/mock-test-data";
import PopperFooterFollowers from "../PopperFooterFollowers";

describe("PopperFooterFollowers", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PopperFooterFollowers />, {
            ...mockState,
            userDetail: { ...mockState.userDetail, item: { ...mockUserDetailResponse } }
        });
        expect(wrapper.text().includes("4")).toBe(true);
        expect(wrapper.text().includes("Followers")).toBe(true);
    });
});
