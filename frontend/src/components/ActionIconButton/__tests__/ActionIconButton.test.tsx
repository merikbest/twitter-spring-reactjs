import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import ActionIconButton from "../ActionIconButton";
import { GifIcon } from "../../../icons";
import HoverAction from "../../HoverAction/HoverAction";
import { LoadingStatus } from "../../../types/common";

describe("ActionIconButton", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(
            <ActionIconButton
                id={"test"}
                onClick={jest.fn()}
                actionText={"Test message"}
                icon={GifIcon}
                size={"medium"}
                disabled={false}
            />, mockStore);
        expect(wrapper.find(HoverAction).at(0).prop("visible")).toBe(false);

        wrapper.find(IconButton).at(0).find("button").simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(0).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(0).prop("actionText")).toBe("Test message");

        wrapper.find(IconButton).at(0).simulate("mouseleave");

        expect(wrapper.find(HoverAction).at(0).prop("visible")).toBe(false);
    });
});
