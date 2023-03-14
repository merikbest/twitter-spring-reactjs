import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";
import { mockUserFullList } from "../../../../../../util/test-utils/mock-test-data";
import FollowersCount from "../FollowersCount";

describe("FollowersCount", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListDetail = { ...mockStore, listDetail: { ...mockStore.listDetail, item: mockUserFullList } };

    it("should render correctly", () => {
        const wrapper = mountWithStore(<FollowersCount />, mockListDetail);
        expect(wrapper.text().includes("0 Followers")).toBe(true);
    });
});
