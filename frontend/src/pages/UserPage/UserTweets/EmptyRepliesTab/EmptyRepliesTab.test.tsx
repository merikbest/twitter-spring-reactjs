import React from "react";
import { Typography } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockMyProfile, mockUserProfile } from "../../../../util/test-utils/mock-test-data";
import EmptyRepliesTab from "./EmptyRepliesTab";

describe("EmptyRepliesTab", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty replies", () => {
        testTitleWithEmptyTweet(
            true,
            "You haven’t any replies yet",
            "When you reply Tweets, they will show up here."
        );

    });

    it("should render user empty replies", () => {
        testTitleWithEmptyTweet(
            false,
            `@${mockUserProfile.username} hasn’t any replies`,
            "When they do, their replies show up here."
        );
    });

    const testTitleWithEmptyTweet = (isUserProfile: boolean, title: string, text: string): void => {
        const wrapper = mountWithStore(<EmptyRepliesTab />,
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
