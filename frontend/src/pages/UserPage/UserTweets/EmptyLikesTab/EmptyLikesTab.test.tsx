import React from "react";
import { Typography } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockMyProfile, mockUserProfile } from "../../../../util/test-utils/mock-test-data";
import EmptyLikesTab from "./EmptyLikesTab";

describe("EmptyLikesTab", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty likes", () => {
        testTitleWithEmptyTweet(
            true,
            "You don’t have any likes yet",
            "Tap the heart on any Tweet to show it some love. When you do, it’ll show up here."
        );
    });

    it("should render user empty likes", () => {
        testTitleWithEmptyTweet(
            false,
            `@${mockUserProfile.username} hasn’t liked any Tweets`,
            "When they do, those Tweets will show up here."
        );
    });

    const testTitleWithEmptyTweet = (isUserProfile: boolean, title: string, text: string): void => {
        const wrapper = mountWithStore(<EmptyLikesTab />,
            {
                ...mockRootState,
                userProfile: {
                    ...mockRootState.userProfile,
                    user: isUserProfile ? mockMyProfile : mockUserProfile
                }
            }
        );
        expect(wrapper.find(Typography).at(0).text().includes(title)).toBe(true);
        expect(wrapper.find(Typography).at(1).text().includes(text)).toBe(true);
    };
});
