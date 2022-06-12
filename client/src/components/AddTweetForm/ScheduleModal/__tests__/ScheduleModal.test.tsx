import React from "react";
import {Button, Dialog} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import {FilledSelect} from "../../../FilledSelect/FilledSelect";
import ScheduleModal from "../ScheduleModal";

describe("ScheduleModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly and click submit", () => {
        const mockOnClose = jest.fn();
        const mockHandleScheduleDate = jest.fn();
        const wrapper = mountWithStore(
            <ScheduleModal
                visible={true}
                selectedScheduleDate={null}
                onClose={mockOnClose}
                handleScheduleDate={mockHandleScheduleDate}
                clearScheduleDate={jest.fn()}
                onOpenUnsentTweetsModal={jest.fn()}
            />, mockRootState);

        expect(wrapper.text().includes("Schedule")).toBe(true);
        expect(wrapper.text().includes("Date")).toBe(true);
        expect(wrapper.text().includes("Month")).toBe(true);
        expect(wrapper.text().includes("Day")).toBe(true);
        expect(wrapper.text().includes("Time")).toBe(true);
        expect(wrapper.text().includes("Hour")).toBe(true);
        expect(wrapper.text().includes("Minute")).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(Button).at(0).text().includes("Confirm")).toBe(true);
        expect(mockOnClose).toHaveBeenCalled();
        expect(mockHandleScheduleDate).toHaveBeenCalled();
    });

    it("should click Clear Schedule Date", () => {
        const mockOnClose = jest.fn();
        const mockClearScheduleDate = jest.fn();
        const wrapper = mountWithStore(
            <ScheduleModal
                visible={true}
                selectedScheduleDate={new Date("2222-06-14T00:00:00.000Z")}
                onClose={mockOnClose}
                handleScheduleDate={jest.fn()}
                clearScheduleDate={mockClearScheduleDate}
                onOpenUnsentTweetsModal={jest.fn()}
            />, mockRootState);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(Button).at(0).text().includes("Clear")).toBe(true);
        expect(mockOnClose).toHaveBeenCalled();
        expect(mockClearScheduleDate).toHaveBeenCalled();
    });

    it("should render empty Schedule Modal", () => {
        const wrapper = mountWithStore(
            <ScheduleModal
                visible={false}
                selectedScheduleDate={null}
                onClose={jest.fn()}
                handleScheduleDate={jest.fn()}
                clearScheduleDate={jest.fn()}
                onOpenUnsentTweetsModal={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(false);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should click and change Month", () => {
        testSelect(0, "#select-month", "12");
    });

    it("should click and change Day", () => {
        testSelect(1, "#select-day", "12");
    });

    it("should click and change Year", () => {
        testSelect(2, "#select-year", "2024");
    });

    it("should click and change Hour", () => {
        testSelect(3, "#select-hour", "12");
    });

    it("should click and change Minute", () => {
        testSelect(4, "#select-minute", "12");
    });

    const testSelect = (selectId: number, selectName: string, selectValue: string): void => {
        const wrapper = mountWithStore(
            <ScheduleModal
                visible={true}
                selectedScheduleDate={null}
                onClose={jest.fn()}
                handleScheduleDate={jest.fn()}
                clearScheduleDate={jest.fn()}
                onOpenUnsentTweetsModal={jest.fn()}
            />, mockRootState);

        wrapper.find(FilledSelect).find(selectName).at(selectId).find("select").simulate("change", {target: {value: selectValue}});
        expect(wrapper.find(FilledSelect).find(selectName).at(selectId).prop("value")).toBe(selectValue);
    };
});
