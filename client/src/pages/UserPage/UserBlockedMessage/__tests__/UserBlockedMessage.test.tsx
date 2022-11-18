import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockUser} from "../../../../util/mockData/mockData";
import UserBlockedMessage from "../UserBlockedMessage";

describe("UserBlockedMessage", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserBlockedMessage/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes("You’re blocked")).toBe(true);
        expect(wrapper.text().includes(`You can’t follow or see @${mockUser.username}’s Tweets.`)).toBe(true);
    });
});
