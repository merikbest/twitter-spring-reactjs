import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockSimpleList } from "../../../../util/test-utils/mock-test-data";
import ListsModalItem from "../ListsModalItem";

describe("ListsModalItem", () => {
    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<ListsModalItem
            list={mockSimpleList[0]} />, createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.find(Avatar).prop("src")).toBe(mockSimpleList[0].altWallpaper);
        expect(wrapper.text().includes(mockSimpleList[0].name)).toBe(true);
    });
});
