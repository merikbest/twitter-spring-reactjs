import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import ScheduleFooter from "../ScheduleFooter";

describe("ScheduleFooter", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const mockOnOpen = jest.fn();
        const wrapper = mountWithStore(<ScheduleFooter onOpenUnsentTweetsModal={mockOnOpen} />, mockStore);
        wrapper.find(Button).simulate("click");
        expect(mockOnOpen).toHaveBeenCalled();
        expect(wrapper.text().includes("Scheduled Tweets")).toBe(true);
    });
});
