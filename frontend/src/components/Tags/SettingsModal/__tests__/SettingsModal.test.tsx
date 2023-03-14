import React from "react";
import { Checkbox, Dialog, IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import SettingsModal from "../SettingsModal";
import CloseButton from "../../../CloseButton/CloseButton";

describe("SettingsModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<SettingsModal />, mockRootState);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.text().includes("Trends")).toBe(true);
        expect(wrapper.text().includes("Location")).toBe(true);
        expect(wrapper.text().includes("Show content in this location")).toBe(true);
        expect(wrapper.text().includes("When this is on, you’ll see what’s happening around you right now.")).toBe(true);
        expect(wrapper.text().includes("Personalization")).toBe(true);
        expect(wrapper.text().includes("Trends for you")).toBe(true);
        expect(wrapper.text().includes("You can personalize trends based on your location and who you follow.")).toBe(true);
    });

    it("should click Checkboxes", () => {
        const wrapper = mountWithStore(<SettingsModal />, mockRootState);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(true);
        expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(true);
        wrapper.find(Checkbox).find("input").at(0).simulate("change", { target: { checked: false } });
        wrapper.find(Checkbox).find("input").at(1).simulate("change", { target: { checked: false } });
        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(false);
        expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(false);
    });

    it("should click Checkboxes", () => {
        const wrapper = mountWithStore(<SettingsModal />, mockRootState);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        wrapper.find(CloseButton).find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(Dialog).prop("open")).toBe(false);
    });

    it("should render empty SettingsModal correctly", () => {
        const wrapper = mountWithStore(<SettingsModal />, mockRootState);
        expect(wrapper.find(Dialog).prop("open")).toBe(false);
    });
});
