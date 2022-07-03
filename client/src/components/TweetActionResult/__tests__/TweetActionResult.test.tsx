import React from "react";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import TweetActionResult, {TweetActionResults} from "../TweetActionResult";

describe("TweetActionResult", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render PIN icon", () => {
        const wrapper = mountWithStore(<TweetActionResult action={TweetActionResults.PIN} text={"text"}/>, mockRootState);
        expect(wrapper.find("#pinOutlinedIcon").exists()).toBe(true);
    });

    it("should render RETWEET icon", () => {
        const wrapper = mountWithStore(<TweetActionResult action={TweetActionResults.RETWEET} text={"text"}/>, mockRootState);
        expect(wrapper.find("#retweetOutlinedIconSm").exists()).toBe(true);
    });

    it("should render LIKE icon", () => {
        const wrapper = mountWithStore(<TweetActionResult action={TweetActionResults.LIKE} text={"text"}/>, mockRootState);
        expect(wrapper.find("#likeOutlinedIcon").exists()).toBe(true);
    });
});
