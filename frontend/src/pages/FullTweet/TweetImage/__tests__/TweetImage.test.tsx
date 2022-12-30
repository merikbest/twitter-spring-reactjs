import React from "react";

import {mockFullTweet} from "../../../../util/mockData/mockData";
import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import TweetImage from "../TweetImage";

describe("TweetImage", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetImage/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockFullTweet.images[0].src);
    });
});
