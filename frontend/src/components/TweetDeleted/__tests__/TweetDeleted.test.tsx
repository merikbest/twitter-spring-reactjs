import React from "react";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../types/common";
import TweetDeleted from "../TweetDeleted";

describe("TweetDeleted", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetDeleted />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes("This Tweet was deleted by the Tweet author.")).toBe(true);
        expect(wrapper.text().includes("Learn more")).toBe(true);
    });
});
