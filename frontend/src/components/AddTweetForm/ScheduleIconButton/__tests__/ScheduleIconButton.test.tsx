import React from "react";
import { Button, IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ScheduleIconButton from "../ScheduleIconButton";
import ScheduleModal from "../../ScheduleModal/ScheduleModal";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import ScheduleFooter from "../../ScheduleModal/ScheduleFooter/ScheduleFooter";
import UnsentTweetsModal from "../../UnsentTweetsModal/UnsentTweetsModal";
import ScheduleTitle from "../../ScheduleModal/ScheduleTitle/ScheduleTitle";
import UnsentTweetsHeader from "../../UnsentTweetsModal/UnsentTweetItem/UnsentTweetsHeader/UnsentTweetsHeader";

describe("ScheduleIconButton", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should open ScheduleModal", () => {
        const wrapper = mountWithStore(<ScheduleIconButton buttonName={"Add"} disabled={false} />, mockStore);
        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(false);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(true);
        wrapper.find(ScheduleModal).find(ScheduleTitle).find(IconButton).simulate("click");
        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(false);
    });

    it("should open UnsentTweetsModal", () => {
        const wrapper = mountWithStore(<ScheduleIconButton buttonName={"Add"} disabled={false} />, mockStore);
        expect(wrapper.find(UnsentTweetsModal).prop("visible")).toBe(false);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        wrapper.find(ScheduleModal).find(ScheduleFooter).find(Button).simulate("click");
        expect(wrapper.find(UnsentTweetsModal).prop("visible")).toBe(true);
        wrapper.find(UnsentTweetsModal).find(UnsentTweetsHeader).find(IconButton).simulate("click");
        expect(wrapper.find(UnsentTweetsModal).prop("visible")).toBe(false);
    });
});
