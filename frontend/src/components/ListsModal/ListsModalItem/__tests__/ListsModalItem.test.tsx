import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockSimpleList} from "../../../../util/mockData/mockData";
import ListsModalItem from "../ListsModalItem";

describe("ListsModalItem", () => {
    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<ListsModalItem list={mockSimpleList[0]}/>, createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.find(Avatar).prop("src")).toBe(mockSimpleList[0].altWallpaper);
        expect(wrapper.text().includes(mockSimpleList[0].name)).toBe(true);
    });
});
