import React from "react";
import { Avatar } from "@material-ui/core";

import { mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import TweetAvatar from "../TweetAvatar";

describe("TweetAvatar", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetAvatar src={mockFullTweet.user.avatar} userId={1} />);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockFullTweet.user.avatar);
    });
});
