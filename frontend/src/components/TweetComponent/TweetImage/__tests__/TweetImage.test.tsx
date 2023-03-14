import React from "react";
import routeData from "react-router";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";
import { MODAL } from "../../../../constants/path-constants";
import TweetImage from "../TweetImage";

describe("TweetImage", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <TweetImage
                tweetId={mockFullTweet.id}
                imageSrc={mockFullTweet.images[0].src}
            />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockFullTweet.images[0].src);
    });

    it("should render small image", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: MODAL, hash: "", search: "", state: undefined
        });
        const wrapper = mountWithStore(
            <TweetImage
                tweetId={mockFullTweet.id}
                imageSrc={mockFullTweet.images[0].src}
            />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockFullTweet.images[0].src);
    });
});
