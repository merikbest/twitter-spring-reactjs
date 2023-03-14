import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import EmptyFollowersDescription from "../EmptyFollowersDescription";
import { mockUserProfile } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("EmptyFollowersDescription", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render my profile following empty message", () => {
        const wrapper = mountWithStore(<EmptyFollowersDescription activeTab={0} />, mockRootState);
        expect(wrapper.text().includes("You aren’t following anyone yet")).toBe(true);
        expect(wrapper.text().includes("When you do, they’ll be listed here and you’ll see their Tweets in your timeline.")).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Find people to follow");
    });

    it("should render my profile followers empty message", () => {
        const wrapper = mountWithStore(<EmptyFollowersDescription activeTab={1} />, mockRootState);
        expect(wrapper.text().includes("You don’t have any followers yet")).toBe(true);
        expect(wrapper.text().includes("When someone follows you, you’ll see them here.")).toBe(true);
    });

    it("should render user profile following empty message", () => {
        const mockState = { ...mockRootState, userProfile: { ...mockRootState.userProfile, user: mockUserProfile } };
        const wrapper = mountWithStore(<EmptyFollowersDescription activeTab={0} />, mockState);
        expect(wrapper.text().includes(`@${mockUserProfile.username} isn’t following anyone`)).toBe(true);
        expect(wrapper.text().includes("When they do, they’ll be listed here.")).toBe(true);
    });

    it("should render user profile followers empty message", () => {
        const mockState = { ...mockRootState, userProfile: { ...mockRootState.userProfile, user: mockUserProfile } };
        const wrapper = mountWithStore(<EmptyFollowersDescription activeTab={1} />, mockState);
        expect(wrapper.text().includes(`@${mockUserProfile.username} doesn’t have any followers`)).toBe(true);
        expect(wrapper.text().includes("When someone follows them, they’ll be listed here.")).toBe(true);
    });
});
