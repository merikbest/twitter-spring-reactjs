import React from "react";
import { Button, Dialog } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { FilledSelect } from "../../../FilledSelect/FilledSelect";
import ScheduleModal from "../ScheduleModal";
import { LoadingStatus } from "../../../../types/common";
import { AddTweetFormTypes } from "../../../../store/ducks/addTweetForm/constants/actionTypes";

describe("ScheduleModal", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should render correctly and click submit", () => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(
            <ScheduleModal
                visible
                onClose={mockOnClose}
                onOpenUnsentTweetsModal={jest.fn()}
            />, mockState);
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
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: expect.any(Date),
            type: AddTweetFormTypes.SET_SCHEDULE_DATE
        });
        expect(mockDispatchFn).nthCalledWith(2, { type: AddTweetFormTypes.SET_CLOSE_POLL });
    });

    it("should click Clear Schedule Date", () => {
        const mockRootState = { ...mockState, addTweetForm: { ...mockState.addTweetForm, scheduledDate: new Date() } };
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(
            <ScheduleModal
                visible
                onClose={mockOnClose}
                onOpenUnsentTweetsModal={jest.fn()}
            />, mockRootState);
        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(Button).at(0).text().includes("Clear")).toBe(true);
        expect(mockOnClose).toHaveBeenCalled();
        expect(mockDispatchFn).nthCalledWith(1, { type: AddTweetFormTypes.CLEAR_SCHEDULE_DATE });
    });

    it("should render empty Schedule Modal", () => {
        const wrapper = mountWithStore(
            <ScheduleModal
                visible={false}
                onClose={jest.fn()}
                onOpenUnsentTweetsModal={jest.fn()}
            />, mockState);
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
                visible
                onClose={jest.fn()}
                onOpenUnsentTweetsModal={jest.fn()}
            />, mockState);
        wrapper.find(FilledSelect).find(selectName).at(selectId).find("select").simulate("change", { target: { value: selectValue } });
        expect(wrapper.find(FilledSelect).find(selectName).at(selectId).prop("value")).toBe(selectValue);
    };
});
