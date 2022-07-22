import React from "react";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {mockFullTweet} from "../../../util/mockData/mockData";
import YouTubeVideo from "../YouTubeVideo";

describe("YouTubeVideo", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<YouTubeVideo tweet={mockFullTweet} />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("iframe").prop("src")).toBe("https://www.youtube.com/embed/ewZZNeYDiLo");
        expect(wrapper.text().includes(mockFullTweet.linkTitle)).toBe(true);
    });
});
