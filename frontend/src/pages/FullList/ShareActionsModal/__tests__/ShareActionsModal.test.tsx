import React from "react";
import { ClickAwayListener, IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import ShareActionsModal from "../ShareActionsModal";
import HoverAction from "../../../../components/HoverAction/HoverAction";
import { LoadingStatus } from "../../../../types/common";

describe("ShareActionsModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render ShareActionsModal correctly", () => {
        const wrapper = mountWithStore(<ShareActionsModal />, mockStore);
        wrapper.find(IconButton).simulate("click");

        expect(wrapper.text().includes("Tweet this")).toBe(true);
        expect(wrapper.text().includes("Send via Direct Message")).toBe(true);
        expect(wrapper.text().includes("Copy link to List")).toBe(true);
        expect(wrapper.text().includes("Share List")).toBe(true);
    });

    it("should click away ShareActionsModal", () => {
        const wrapper = mountWithStore(<ShareActionsModal />, mockStore);
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());

        expect(wrapper.find(ClickAwayListener).exists()).toBeTruthy();
    });

    it("should hover IconButton", () => {
        const wrapper = mountWithStore(<ShareActionsModal />, mockStore);
        wrapper.find(IconButton).simulate("mouseenter");

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
    });
});
