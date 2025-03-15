import React from "react";
import { Button, IconButton, Typography } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockMyProfile, mockUserProfile } from "../../../../util/test-utils/mock-test-data";
import AddTweetModal from "../../../../components/AddTweetModal/AddTweetModal";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import EmptyMediaTab from "./EmptyMediaTab";

describe("EmptyMediaTab", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty media", () => {
        testTitleWithEmptyTweet(
            true,
            "You haven’t Tweeted any photos or videos yet",
            "When you send Tweets with photos or videos in them, it will show up here."
        );

    });

    it("should render user empty media", () => {
        testTitleWithEmptyTweet(
            false,
            `@${mockUserProfile.username} hasn’t Tweeted any photos or videos`,
            "When they do, their media will show up here."
        );
    });

    it("should render Add Tweet Modal on click Tweet a photo or video button and close", () => {
        testAddTweetModal("Tweet a photo or video");
    });

    const testTitleWithEmptyTweet = (isUserProfile: boolean, title: string, text: string): void => {
        const wrapper = mountWithStore(<EmptyMediaTab />,
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

    const testAddTweetModal = (buttonText: string): void => {
        const wrapper = mountWithStore(<EmptyMediaTab />, {
            ...mockRootState,
            userProfile: {
                ...mockRootState.userProfile,
                user: mockMyProfile
            }
        });

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
        expect(wrapper.find(Button).at(0).text().includes(buttonText)).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(true);

        wrapper.find(AddTweetModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
    };
});
