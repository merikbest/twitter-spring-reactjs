import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import TweetText from "../TweetText";

describe("TweetText", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetText/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(mockFullTweet.text)).toBe(true);
    });
});
