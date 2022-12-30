import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockUserDetailResponse} from "../../../../util/mockData/mockData";
import PopperFooterFollowing from "../PopperFooterFollowing";

describe("PopperFooterFollowing", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PopperFooterFollowing/>, {
            ...mockState,
            userDetail: {...mockState.userDetail, item: {...mockUserDetailResponse}}
        });
        expect(wrapper.text().includes("2")).toBe(true);
        expect(wrapper.text().includes("Following")).toBe(true);
    });
});
