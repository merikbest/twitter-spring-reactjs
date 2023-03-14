import React from "react";
import { IconButton } from "@material-ui/core";

import { mountWithStore } from "../../../../util/test-utils/test-helper";
import TweetActivityButton from "../TweetActivityButton";
import TweetAnalyticsModal from "../../../TweetAnalyticsModal/TweetAnalyticsModal";
import CloseButton from "../../../CloseButton/CloseButton";

describe("TweetActivityButton", () => {
    it("should open/close TweetAnalyticsModal", () => {
        const wrapper = mountWithStore(
            <TweetActivityButton
                fullName={"test_fullName"}
                username={"test_username"}
                text={"test_text"}
            />);
        expect(wrapper.find(TweetAnalyticsModal).prop("visible")).toBe(false);
        wrapper.find("#tweetAnalytics").at(0).simulate("click");
        expect(wrapper.find(TweetAnalyticsModal).prop("visible")).toBe(true);
        wrapper.find(TweetAnalyticsModal).find(CloseButton).find(IconButton).at(0).simulate("click");
        expect(wrapper.find(TweetAnalyticsModal).prop("visible")).toBe(false);
    });
});
