import React from "react";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import { mockFullTweet } from "../../../util/test-utils/mock-test-data";
import SmallLinkPreview from "../SmallLinkPreview";
import { LoadingStatus } from "../../../types/common";

describe("SmallLinkPreview", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should click Open YouTube Video", () => {
        const mockOnOpenYouTubeVideo = jest.fn();
        const wrapper = mountWithStore(
            <SmallLinkPreview
                link={mockFullTweet.link}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                onOpenYouTubeVideo={mockOnOpenYouTubeVideo}
                isFullTweet
            />, mockRootState);
        wrapper.find("#openYouTubeVideo").simulate("click");
        expect(mockOnOpenYouTubeVideo).toHaveBeenCalled();
        expect(wrapper.text().includes(mockFullTweet.linkTitle)).toBe(true);
        expect(wrapper.text().includes("www.youtube.com")).toBe(true);
    });

    it("should render site link", () => {
        const wrapper = mountWithStore(
            <SmallLinkPreview
                link={mockFullTweet.link}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                isFullTweet={false}
            />, mockRootState);
        expect(wrapper.find("#openYouTubeVideo").exists()).toBeFalsy();
        expect(wrapper.find("a").prop("href")).toBe(mockFullTweet.link);
    });
});
