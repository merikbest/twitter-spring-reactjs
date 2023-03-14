import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import TweetText from "../TweetText";

describe("TweetText", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetText />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(mockFullTweet.text)).toBe(true);
    });
});
