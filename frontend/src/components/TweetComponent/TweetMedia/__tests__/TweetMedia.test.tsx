import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import { LinkCoverSize, LoadingStatus } from "../../../../types/common";
import YouTubeVideo from "../../../YouTubeVideo/YouTubeVideo";
import SmallLinkPreview from "../../../SmallLinkPreview/SmallLinkPreview";
import LargeLinkPreview from "../../../LargeLinkPreview/LargeLinkPreview";
import TweetMedia from "../TweetMedia";

describe("TweetMedia", () => {
    const mockTweet = createMockRootState(LoadingStatus.SUCCESS);

    it("should render empty tweet Link preview", () => {
        const wrapper = mountWithStore(
            <TweetMedia
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                linkCoverSize={mockFullTweet.linkCoverSize}
            />, mockTweet);
        expect(wrapper.find(YouTubeVideo).exists()).toBeFalsy();
        expect(wrapper.find(SmallLinkPreview).exists()).toBeFalsy();
        expect(wrapper.find(LargeLinkPreview).exists()).toBeFalsy();
    });

    it("should render Small YouTube Link preview", () => {
        const wrapper = mountWithStore(
            <TweetMedia
                link={mockFullTweet.link}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                linkCoverSize={mockFullTweet.linkCoverSize}
            />, mockTweet);
        expect(wrapper.find(SmallLinkPreview).exists()).toBeTruthy();
    });

    it("should render YouTube Video preview", () => {
        const wrapper = mountWithStore(
            <TweetMedia
                link={mockFullTweet.link}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                linkCoverSize={mockFullTweet.linkCoverSize}
            />, mockTweet);
        expect(wrapper.find(YouTubeVideo).exists()).toBeFalsy();
        wrapper.find(SmallLinkPreview).find("#openYouTubeVideo").simulate("click");
        expect(wrapper.find(YouTubeVideo).exists()).toBeTruthy();
    });

    it("should render small YouTube Link preview", () => {
        const wrapper = mountWithStore(
            <TweetMedia
                link={mockFullTweet.link}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                linkCoverSize={mockFullTweet.linkCoverSize}
            />, mockTweet);
        expect(wrapper.find(SmallLinkPreview).exists()).toBeTruthy();
    });

    it("should render small site Link preview", () => {
        const wrapper = mountWithStore(
            <TweetMedia
                link={"https://teamsesh.bigcartel.com/products"}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                linkCoverSize={mockFullTweet.linkCoverSize}
            />, mockTweet);
        expect(wrapper.find(SmallLinkPreview).exists()).toBeTruthy();
    });

    it("should render large site Link preview", () => {
        const wrapper = mountWithStore(
            <TweetMedia
                link={"https://teamsesh.bigcartel.com/products"}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                linkCoverSize={LinkCoverSize.LARGE}
            />, mockTweet);
        expect(wrapper.find(LargeLinkPreview).exists()).toBeTruthy();
    });
});
