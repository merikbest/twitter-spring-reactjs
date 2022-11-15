import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types/common";
import {mockUserFullList} from "../../../../../util/mockData/mockData";
import PopperListDescription from "../PopperListDescription";

describe("PopperListDescription", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListDetail = {...mockStore, listDetail: {item: mockUserFullList}};

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PopperListDescription/>, mockListDetail);
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockUserFullList.listOwner.avatar.src);
        expect(wrapper.text().includes(mockUserFullList.name)).toBe(true);
        expect(wrapper.text().includes(mockUserFullList.description)).toBe(true);
        expect(wrapper.text().includes(mockUserFullList.listOwner.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUserFullList.listOwner.username)).toBe(true);
    });
});
