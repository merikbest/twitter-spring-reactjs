import React from "react";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import LargeLinkPreview from "../LargeLinkPreview";
import {mockFullTweet} from "../../../util/mockData/mockData";
import {LoadingStatus} from "../../../store/types/common";

describe("LargeLinkPreview", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <LargeLinkPreview
                link={mockFullTweet.link}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                isFullTweet
            />, mockRootState);
        expect(wrapper.text().includes(mockFullTweet.linkTitle)).toBe(true);
        expect(wrapper.text().includes("www.youtube.com")).toBe(true);
    });
});
