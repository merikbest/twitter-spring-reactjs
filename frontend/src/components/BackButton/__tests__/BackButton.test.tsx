import React from "react";
import { createMemoryHistory } from "history";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import HoverAction from "../../HoverAction/HoverAction";
import BackButton from "../BackButton";
import { LoadingStatus } from "../../../types/common";

describe("BackButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly and click back", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "goBack");
        const wrapper = mountWithStore(<BackButton />, mockRootState, history);

        wrapper.find(IconButton).simulate("click");

        expect(pushSpy).toHaveBeenCalled();
        expect(wrapper.find("#arrowIcon").exists()).toBeTruthy();
    });

    it("should hover Back icon and render Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<BackButton />, mockRootState);
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Back");
    });
});
