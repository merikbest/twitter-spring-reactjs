import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ScheduleDateInfo from "../ScheduleDateInfo";
import { formatScheduleDate } from "../../../../util/format-date-helper";

describe("ScheduleDateInfo", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ScheduleDateInfo selectedScheduleDate={new Date()} />, mockStore);
        expect(wrapper.text()).toEqual(`Will send on ${formatScheduleDate(new Date())}`);
    });
});
