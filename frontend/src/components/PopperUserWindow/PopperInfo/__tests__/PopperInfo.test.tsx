import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {mockUserDetailResponse} from "../../../../util/mockData/mockData";
import {LoadingStatus} from "../../../../store/types/common";
import PopperInfo from "../PopperInfo";

describe("PopperInfo", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PopperInfo/>, {
            ...mockState,
            userDetail: {...mockState.userDetail, item: {...mockUserDetailResponse}}
        });
        expect(wrapper.text().includes(mockUserDetailResponse.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUserDetailResponse.username)).toBe(true);
    });

    it("should render private profile icon", () => {
        const wrapper = mountWithStore(<PopperInfo/>, {
            ...mockState,
            userDetail: {...mockState.userDetail, item: {...mockUserDetailResponse, isPrivateProfile: true}}
        });
        expect(wrapper.find("svg").prop("id")).toEqual("lockIcon");
    });
});
