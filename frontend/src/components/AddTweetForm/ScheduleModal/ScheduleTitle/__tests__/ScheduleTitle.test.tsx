import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import ScheduleTitle from "../ScheduleTitle";

describe("ScheduleTitle", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render Update button", () => {
        const mockRootState = { ...mockStore, addTweetForm: { ...mockStore.addTweetForm, scheduledDate: new Date() } };
        const wrapper = mountWithStore(
            <ScheduleTitle
                onClose={jest.fn()}
                isValidSelectedDate
                onSubmitScheduleDate={jest.fn()}
                onSubmitClearScheduleDate={jest.fn()}
            />, mockRootState);
        expect(wrapper.find(Button).at(0).text().includes("Clear")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Update")).toBe(true);
    });

    it("should render Confirm button", () => {
        const wrapper = mountWithStore(
            <ScheduleTitle
                onClose={jest.fn()}
                isValidSelectedDate={false}
                onSubmitScheduleDate={jest.fn()}
                onSubmitClearScheduleDate={jest.fn()}
            />, mockStore);
        expect(wrapper.find(Button).at(0).text().includes("Confirm")).toBe(true);
    });
});
