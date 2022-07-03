import React from "react";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {mockFullTweet} from "../../../util/mockData/mockData";
import SmallLinkPreview from "../SmallLinkPreview";

describe("SmallLinkPreview", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should click Open YouTube Video", () => {
        const mockOnOpenYouTubeVideo = jest.fn();
        const wrapper = mountWithStore(
            <SmallLinkPreview
                tweet={mockFullTweet}
                onOpenYouTubeVideo={mockOnOpenYouTubeVideo}
                isFullTweet={true}
            />, mockRootState);
        
        wrapper.find("#openYouTubeVideo").simulate("click");
        expect(mockOnOpenYouTubeVideo).toHaveBeenCalled();
        expect(wrapper.text().includes(mockFullTweet.linkTitle)).toBe(true);
        expect(wrapper.text().includes("www.youtube.com")).toBe(true);
    });

    it("should render site link", () => {
        const wrapper = mountWithStore(<SmallLinkPreview tweet={mockFullTweet} isFullTweet={false}/>, mockRootState);
        
        expect(wrapper.find("#openYouTubeVideo").exists()).toBeFalsy();
        expect(wrapper.find("a").prop("href")).toBe(mockFullTweet.link);
    });
});
