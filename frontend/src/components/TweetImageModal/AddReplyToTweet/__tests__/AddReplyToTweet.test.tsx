import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";
import AddTweetForm from "../../../AddTweetForm/AddTweetForm";
import AddReplyToTweet from "../AddReplyToTweet";

describe("AddReplyToTweet", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<AddReplyToTweet />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(`Replying to @${mockFullTweet.user.username}`)).toBe(true);
        expect(wrapper.find(AddTweetForm).prop("title")).toBe("Tweet your reply");
    });
});
