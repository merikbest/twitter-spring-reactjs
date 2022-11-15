import React from "react";

import {createMockRootState, mountWithStore} from "../../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../../store/types/common";
import {mockUserFullList} from "../../../../../../util/mockData/mockData";
import MembersCount from "../MembersCount";

describe("MembersCount", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListDetail = {...mockStore, listDetail: {...mockStore.listDetail, item: mockUserFullList}};

    it("should render correctly", () => {
        const wrapper = mountWithStore(<MembersCount/>, mockListDetail);
        expect(wrapper.text().includes("2 Members")).toBe(true);
    });
});
