import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockFullList} from "../../../../util/mockData/mockData";
import FullListDescription from "../FullListDescription";

describe("FullListDescription", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const mockState = {...mockRootState, list: {...mockRootState.list, list: mockFullList}};
        const wrapper = mountWithStore(<FullListDescription/>, mockState);
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockFullList.listOwner.avatar.src);
        expect(wrapper.text().includes(mockFullList.name)).toBe(true);
        expect(wrapper.text().includes(mockFullList.description)).toBe(true);
        expect(wrapper.text().includes(mockFullList.listOwner.fullName)).toBe(true);
        expect(wrapper.text().includes(mockFullList.listOwner.username)).toBe(true);
    });

    it("should render private profile", () => {
        const mockState = {...mockRootState, list: {...mockRootState.list, list: {...mockFullList, isPrivate: true}}};
        const wrapper = mountWithStore(<FullListDescription/>, mockState);
        expect(wrapper.find("#lockIcon").exists()).toBeTruthy();
    });
});
