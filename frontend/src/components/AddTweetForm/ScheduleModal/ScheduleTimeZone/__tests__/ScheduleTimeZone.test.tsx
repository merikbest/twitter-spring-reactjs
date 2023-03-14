import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import ScheduleTimeZone from "../ScheduleTimeZone";

describe("ScheduleTimeZone", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ScheduleTimeZone />, mockStore);
        expect(wrapper.text().includes("Time zone")).toBe(true);
        expect(wrapper.text().includes(`${Intl.DateTimeFormat().resolvedOptions().timeZone} Standard Time`)).toBe(true);
    });
});
