import React from "react";

import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import TweetImage from "../TweetImage";

describe("TweetImage", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetImage />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockFullTweet.images[0].src);
    });
});
