import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import FollowTopicButton from "../FollowTopicButton";

describe("FollowTopicButton", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<FollowTopicButton onClickButton={jest.fn()} />, createMockRootState());
        expect(wrapper.find(Button).text().includes("Follow")).toBe(true);
    });
});
