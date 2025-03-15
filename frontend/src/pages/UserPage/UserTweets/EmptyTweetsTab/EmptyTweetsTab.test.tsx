import React from "react";
import { Button, IconButton, Typography } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockMyProfile, mockUserProfile } from "../../../../util/test-utils/mock-test-data";
import AddTweetModal from "../../../../components/AddTweetModal/AddTweetModal";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import EmptyTweetsTab from "./EmptyTweetsTab";

describe("EmptyTweetsTab", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty tweets", () => {
        testTitleWithEmptyTweet(
            true,
            "You haven’t any Tweets yet",
            "When you send Tweets, they will show up here."
        );

    });

    it("should render user empty tweets", () => {
        testTitleWithEmptyTweet(
            false,
            `@${mockUserProfile.username} hasn’t any Tweets`,
            "When they do, their Tweets show up here."
        );
    });

    it("should render Add Tweet Modal on click Send button and close", () => {
        testAddTweetModal("Send Tweet");
    });

    const testTitleWithEmptyTweet = (isUserProfile: boolean, title: string, text: string): void => {
        const wrapper = mountWithStore(<EmptyTweetsTab />,
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
        const wrapper = mountWithStore(<EmptyTweetsTab />, {
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
