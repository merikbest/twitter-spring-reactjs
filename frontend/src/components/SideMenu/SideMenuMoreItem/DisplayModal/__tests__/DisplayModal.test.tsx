import React from "react";
import { Dialog, Radio } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { BackgroundTheme, ColorScheme, LoadingStatus } from "../../../../../types/common";
import DisplayModal from "../DisplayModal";
import { BACKGROUND, COLOR } from "../../../../../constants/common-constants";

describe("DisplayModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        localStorage.setItem(COLOR, "BLUE");
        localStorage.setItem(BACKGROUND, "DEFAULT");
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const { wrapper } = createDisplayModalWrapper();

        expect(wrapper.text().includes("Customize your view")).toBe(true);
        expect(wrapper.text().includes("Manage your font size, color, and background.")).toBe(true);
        expect(wrapper.text().includes("Font size")).toBe(true);
        expect(wrapper.text().includes("Color")).toBe(true);
        expect(wrapper.text().includes("Background")).toBe(true);
        expect(wrapper.find("#blue").find("#checkIcon").exists()).toBeTruthy();
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(false);
        expect(wrapper.find(Radio).at(2).prop("checked")).toBe(false);
    });

    it("should render different colors", () => {
        localStorage.setItem(COLOR, "YELLOW");
        localStorage.setItem(BACKGROUND, "DIM");
        const { wrapper } = createDisplayModalWrapper();

        expect(wrapper.find("#blue").find("#checkIcon").exists()).toBeFalsy();
        expect(wrapper.find("#yellow").find("#checkIcon").exists()).toBeTruthy();
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(false);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(true);
        expect(wrapper.find(Radio).at(2).prop("checked")).toBe(false);
    });

    it("should change Background color", () => {
        const { wrapper, mockChangeBackgroundColor } = createDisplayModalWrapper();

        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(false);
        wrapper.find(Radio).at(1).find("input").simulate("change");
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(true);
        expect(mockChangeBackgroundColor).toHaveBeenCalled();
        expect(mockChangeBackgroundColor).toHaveBeenCalledWith(BackgroundTheme.DIM);
    });

    it("should click DEFAULT Background color", () => {
        localStorage.setItem(BACKGROUND, "DIM");
        const { wrapper, mockChangeBackgroundColor } = createDisplayModalWrapper();

        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(false);
        wrapper.find("#default").simulate("click");
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
        expect(mockChangeBackgroundColor).toHaveBeenCalled();
        expect(mockChangeBackgroundColor).toHaveBeenCalledWith(BackgroundTheme.DEFAULT);
        testClickBackgroundColor("#default", 0, BackgroundTheme.DEFAULT);
    });

    it("should click DEFAULT Background color", () => {
        localStorage.setItem(BACKGROUND, "DIM");
        testClickBackgroundColor("#default", 0, BackgroundTheme.DEFAULT);
    });

    it("should click DIM Background color", () => {
        testClickBackgroundColor("#dim", 1, BackgroundTheme.DIM);
    });

    it("should click LIGHTS_OUT Background color", () => {
        testClickBackgroundColor("#lights-out", 2, BackgroundTheme.LIGHTS_OUT);
    });

    it("should click change BLUE Color scheme", () => {
        localStorage.setItem(COLOR, "YELLOW");
        testClickChangeColorScheme("#blue", ColorScheme.BLUE);
    });

    it("should click change YELLOW Color scheme", () => {
        testClickChangeColorScheme("#yellow", ColorScheme.YELLOW);
    });

    it("should click change CRIMSON Color scheme", () => {
        testClickChangeColorScheme("#crimson", ColorScheme.CRIMSON);
    });

    it("should click change VIOLET Color scheme", () => {
        testClickChangeColorScheme("#violet", ColorScheme.VIOLET);
    });

    it("should click change ORANGE Color scheme", () => {
        testClickChangeColorScheme("#orange", ColorScheme.ORANGE);
    });

    it("should click change GREEN Color scheme", () => {
        testClickChangeColorScheme("#green", ColorScheme.GREEN);
    });

    it("should render empty DisplayModal", () => {
        const { wrapper } = createDisplayModalWrapper(false);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    const testClickBackgroundColor = (backgroundColorId: string, itemId: number, background: BackgroundTheme): void => {
        const { wrapper, mockChangeBackgroundColor } = createDisplayModalWrapper();

        expect(wrapper.find(Radio).at(itemId).prop("checked")).toBe(false);
        wrapper.find(backgroundColorId).simulate("click");
        expect(wrapper.find(Radio).at(itemId).prop("checked")).toBe(true);
        expect(mockChangeBackgroundColor).toHaveBeenCalled();
        expect(mockChangeBackgroundColor).toHaveBeenCalledWith(background);
    };

    const testClickChangeColorScheme = (colorId: string, colorScheme: ColorScheme): void => {
        const { wrapper, mockChangeColorScheme } = createDisplayModalWrapper();

        expect(wrapper.find(colorId).find("#checkIcon").exists()).toBeFalsy();
        wrapper.find(colorId).simulate("click");
        expect(wrapper.find(colorId).find("#checkIcon").exists()).toBeTruthy();
        expect(mockChangeColorScheme).toHaveBeenCalled();
        expect(mockChangeColorScheme).toHaveBeenCalledWith(colorScheme);
    };

    const createDisplayModalWrapper = (visible = true) => {
        const mockOnClose = jest.fn();
        const mockChangeBackgroundColor = jest.fn();
        const mockChangeColorScheme = jest.fn();
        const wrapper = mountWithStore(
            <DisplayModal
                visible={visible}
                onClose={mockOnClose}
                changeBackgroundColor={mockChangeBackgroundColor}
                changeColorScheme={mockChangeColorScheme}
            />, mockRootState);

        return { wrapper, mockOnClose, mockChangeBackgroundColor, mockChangeColorScheme };
    };
});
