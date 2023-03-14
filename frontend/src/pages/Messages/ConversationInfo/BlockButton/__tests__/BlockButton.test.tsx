import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import BlockButton from "../BlockButton";

describe("BlockButton", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<BlockButton
            onBlockUser={jest.fn()} />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(Button).text().includes("Blocked")).toBe(true);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unblock")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Blocked")).toBe(true);
    });
});
