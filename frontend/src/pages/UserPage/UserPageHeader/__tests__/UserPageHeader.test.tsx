import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockMyProfile } from "../../../../util/test-utils/mock-test-data";
import UserPageHeader from "../UserPageHeader";

describe("UserPageHeader", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockState = {
        ...mockRootState,
        userProfile: {
            ...mockRootState.userProfile,
            user: { ...mockMyProfile, mediaTweetCount: 1, likeCount: 1, tweetCount: 1 }
        }
    };

    it("should render tweetCount", () => {
        const wrapper = mountWithStore(<UserPageHeader activeTab={1} />, mockRootState);
        expect(wrapper.text().includes(`${mockMyProfile.tweetCount} Tweets`)).toBe(true);
    });

    it("should render mediaTweetCount", () => {
        const wrapper = mountWithStore(<UserPageHeader activeTab={2} />, mockRootState);
        expect(wrapper.text().includes(`${mockMyProfile.mediaTweetCount} Photos & videos`)).toBe(true);
    });

    it("should render likeCount", () => {
        const wrapper = mountWithStore(<UserPageHeader activeTab={3} />, mockRootState);
        expect(wrapper.text().includes(`${mockMyProfile.likeCount} Likes`)).toBe(true);
    });

    it("should render single tweetCount", () => {
        const wrapper = mountWithStore(<UserPageHeader activeTab={1} />, mockState);
        expect(wrapper.text().includes("1 Tweet")).toBe(true);
    });

    it("should render single mediaTweetCount", () => {
        const wrapper = mountWithStore(<UserPageHeader activeTab={2} />, mockState);
        expect(wrapper.text().includes("1 Photo & video")).toBe(true);
    });

    it("should render single likeCount", () => {
        const wrapper = mountWithStore(<UserPageHeader activeTab={3} />, mockState);
        expect(wrapper.text().includes("1 Like")).toBe(true);
    });
});
