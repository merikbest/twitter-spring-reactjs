import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import HoverAction from "../../HoverAction/HoverAction";
import CloseButton from "../CloseButton";
import { LoadingStatus } from "../../../types/common";

describe("CloseButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<CloseButton onClose={jest.fn()} />, mockRootState);
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Close");
    });
});
