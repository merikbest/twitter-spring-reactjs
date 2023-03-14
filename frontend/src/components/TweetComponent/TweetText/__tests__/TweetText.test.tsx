import React from "react";

import { mountWithStore } from "../../../../util/test-utils/test-helper";
import TweetText from "../TweetText";

describe("TweetText", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetText text={"test_text"} tweetId={1} />);
        expect(wrapper.text().includes("test_text")).toBe(true);
    });
});
