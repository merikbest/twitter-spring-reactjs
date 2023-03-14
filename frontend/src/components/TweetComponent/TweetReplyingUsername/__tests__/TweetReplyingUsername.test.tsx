import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import TweetReplyingUsername from "../TweetReplyingUsername";

describe("TweetReplyingUsername", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <TweetReplyingUsername
                addressedId={1}
                addressedUsername={"Test Name"}
            />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes("Replying to @Test Name")).toBe(true);
    });
});
