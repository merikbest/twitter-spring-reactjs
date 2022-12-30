import React from "react";
import {Avatar} from "@material-ui/core";

import {mountWithStore} from "../../../../util/testHelper";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import TweetAvatar from "../TweetAvatar";

describe("TweetAvatar", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetAvatar src={mockFullTweet.user.avatar.src} userId={1}/>);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockFullTweet.user.avatar.src);
    });
});
