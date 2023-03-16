import React from "react";
import { Radio } from "@material-ui/core";

import Display from "../Display";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { UserActionsType } from "../../../../../store/ducks/user/contracts/actionTypes";
import { BackgroundTheme, ColorScheme } from "../../../../../types/common";
import { BACKGROUND, COLOR } from "../../../../../constants/common-constants";

describe("Display", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <Display
                changeBackgroundColor={jest.fn()}
                changeColorScheme={jest.fn()}
            />, createMockRootState());

        expect(wrapper.text().includes("Twitter")).toBe(true);
        expect(wrapper.text().includes("@Twitter · 31m")).toBe(true);
        expect(wrapper.text().includes("Font size")).toBe(true);
        expect(wrapper.text().includes("Color")).toBe(true);
        expect(wrapper.text().includes("Background")).toBe(true);
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
        expect(wrapper.find("#blue").find("span").exists()).toBe(true);
    });

    it("should change Background", () => {
        const wrapper = mountWithStore(
            <Display
                changeBackgroundColor={jest.fn()}
                changeColorScheme={jest.fn()}
            />, createMockRootState());

        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(false);

        wrapper.find(Radio).at(1).find("input").simulate("change");

        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(false);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(true);
    });

    it("should change Color", () => {
        localStorage.setItem(COLOR, "BLUE");
        const mockChangeColorScheme = jest.fn();
        const wrapper = mountWithStore(
            <Display
                changeBackgroundColor={jest.fn()}
                changeColorScheme={mockChangeColorScheme}
            />, createMockRootState());
        expect(wrapper.find("#blue").find("span").exists()).toBe(true);
        expect(wrapper.find("#yellow").find("span").exists()).toBe(false);

        wrapper.find("#yellow").simulate("click");

        expect(wrapper.find("#blue").find("span").exists()).toBe(false);
        expect(wrapper.find("#yellow").find("span").exists()).toBe(true);
        expect(mockChangeColorScheme).toHaveBeenCalled();
        expect(mockChangeColorScheme).toHaveBeenCalledWith(ColorScheme.YELLOW);
    });

    it("should click Background Dim", () => {
        testOnClickBackground(1, BackgroundTheme.DIM);
    });

    it("should click Background Lights out", () => {
        testOnClickBackground(2, BackgroundTheme.LIGHTS_OUT);
    });

    it("should click Background Default", () => {
        localStorage.setItem(BACKGROUND, "DIM");
        testOnClickBackground(0, BackgroundTheme.DEFAULT);
    });

    const testOnClickBackground = (itemIndex: number, background: BackgroundTheme): void => {
        const mockChangeBackgroundColor = jest.fn();
        const wrapper = mountWithStore(
            <Display
                changeBackgroundColor={mockChangeBackgroundColor}
                changeColorScheme={jest.fn()}
            />, createMockRootState());

        expect(wrapper.find(Radio).at(itemIndex).prop("checked")).toBe(false);

        wrapper.find(`#${background.toLowerCase()}`).simulate("click");

        expect(wrapper.find(Radio).at(itemIndex).prop("checked")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { backgroundColor: background },
            type: UserActionsType.UPDATE_BACKGROUND_COLOR
        });
        expect(mockChangeBackgroundColor).toHaveBeenCalled();
        expect(mockChangeBackgroundColor).toHaveBeenCalledWith(background);
    };
});
