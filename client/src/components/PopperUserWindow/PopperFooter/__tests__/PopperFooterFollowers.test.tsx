import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockUserDetailResponse} from "../../../../util/mockData/mockData";
import PopperFooterFollowers from "../PopperFooterFollowers";

describe("PopperFooterFollowers", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PopperFooterFollowers/>, {
            ...mockState,
            userDetail: {...mockState.userDetail, item: {...mockUserDetailResponse}}
        });
        expect(wrapper.text().includes("2")).toBe(true);
        expect(wrapper.text().includes("Followers")).toBe(true);
    });
});
