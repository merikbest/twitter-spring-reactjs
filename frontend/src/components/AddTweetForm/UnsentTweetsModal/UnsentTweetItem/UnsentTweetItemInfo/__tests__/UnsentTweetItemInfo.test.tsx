import React from "react";

import {createMockRootState, mountWithStore} from "../../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../../store/types/common";
import {mockFullTweet} from "../../../../../../util/mockData/mockData";
import UnsentTweetItemInfo from "../UnsentTweetItemInfo";
import {formatScheduleDate} from "../../../../../../util/formatDate";

describe("UnsentTweetItemInfo", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <UnsentTweetItemInfo
                scheduledDate={"2022-10-15T21:20:33"}
                text={"test"}
                images={mockFullTweet.images}
            />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.text().includes(`Will send on ${formatScheduleDate(new Date("2022-10-15T21:20:33"))}`)).toBe(true);
        expect(wrapper.text().includes("test")).toBe(true);
    });
});
