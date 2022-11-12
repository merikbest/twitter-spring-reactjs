import React from "react";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {mockFullTweet} from "../../../util/mockData/mockData";
import YouTubeVideo from "../YouTubeVideo";
import {LoadingStatus} from "../../../store/types/common";

describe("YouTubeVideo", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <YouTubeVideo
                link={mockFullTweet.link}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
            />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("iframe").prop("src")).toBe("https://www.youtube.com/embed/ewZZNeYDiLo");
        expect(wrapper.text().includes(mockFullTweet.linkTitle)).toBe(true);
    });
});
