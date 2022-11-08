import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import ScheduleDateInfo from "../ScheduleDateInfo";
import {formatScheduleDate} from "../../../../util/formatDate";

describe("ScheduleDateInfo", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ScheduleDateInfo selectedScheduleDate={new Date()}/>, mockStore);
        expect(wrapper.text()).toEqual(`Will send on ${formatScheduleDate(new Date())}`);
    });
});
