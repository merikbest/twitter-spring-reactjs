import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LinkCoverSize, LoadingStatus } from "../../../../types/common";
import SmallLinkPreview from "../../../../components/SmallLinkPreview/SmallLinkPreview";
import YouTubeVideo from "../../../../components/YouTubeVideo/YouTubeVideo";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import LargeLinkPreview from "../../../../components/LargeLinkPreview/LargeLinkPreview";
import TweetMedia from "../TweetMedia";

describe("TweetMedia", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render youtube SmallLinkPreview component", () => {
        const wrapper = mountWithStore(<TweetMedia />, mockRootState);
        expect(wrapper.find(SmallLinkPreview).exists()).toBeTruthy();
    });

    it("should render YouTubeVideo component", () => {
        const wrapper = mountWithStore(<TweetMedia />, mockRootState);
        expect(wrapper.find(YouTubeVideo).exists()).toBeFalsy();
        wrapper.find(SmallLinkPreview).find("#openYouTubeVideo").simulate("click");
        expect(wrapper.find(YouTubeVideo).exists()).toBeTruthy();
    });

    it("should render LargeLinkPreview component", () => {
        const mockState = {
            ...mockRootState,
            tweet: {
                ...mockRootState.tweet,
                tweet: {
                    ...mockFullTweet,
                    link: "https://teamsesh.bigcartel.com/products",
                    linkCoverSize: LinkCoverSize.LARGE
                }
            }
        };
        const wrapper = mountWithStore(<TweetMedia />, mockState);
        expect(wrapper.find(LargeLinkPreview).exists()).toBeTruthy();
    });

    it("should render SmallLinkPreview component", () => {
        const mockState = {
            ...mockRootState,
            tweet: {
                ...mockRootState.tweet,
                tweet: {
                    ...mockFullTweet,
                    link: "https://teamsesh.bigcartel.com/products"
                }
            }
        };
        const wrapper = mountWithStore(<TweetMedia />, mockState);
        expect(wrapper.find(SmallLinkPreview).exists()).toBeTruthy();
    });

    it("should render empty component", () => {
        const mockState = {
            ...mockRootState,
            tweet: {
                ...mockRootState.tweet,
                tweet: {
                    ...mockFullTweet,
                    link: undefined
                }
            }
        };
        const wrapper = mountWithStore(<TweetMedia />, mockState);
        expect(wrapper.find(YouTubeVideo).exists()).toBeFalsy();
        expect(wrapper.find(SmallLinkPreview).exists()).toBeFalsy();
        expect(wrapper.find(LargeLinkPreview).exists()).toBeFalsy();
    });
});
