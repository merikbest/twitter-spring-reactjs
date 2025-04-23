import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";
import MuteUserButton from "../MuteUserButton";
import { LoadingStatus } from "../../../../types/common";
import { mockUserTweetAdditionalInfo } from "../../../../util/test-utils/mock-test-data";

describe("MuteUserButton", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click mute", () => {
        testClickButton(false, "#muteIcon", "Mute", "muted");
    });

    it("should click unmute", () => {
        testClickButton(true, "#unmuteIcon", "Unmute", "unmuted");
    });

    const testClickButton = (isUserMuted: boolean, iconId: string, text: string, snackbarText: string): void => {
        const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
        const mockState = {
            ...mockRootState,
            tweetAdditionalInfo: {
                ...mockRootState.tweetAdditionalInfo,
                tweetAdditionalInfo: {
                    ...mockUserTweetAdditionalInfo,
                    author: {
                        ...mockUserTweetAdditionalInfo.author,
                        isUserMuted
                    }
                }
            }
        };
        const wrapper = mountWithStore(<MuteUserButton tweetId={1} />, mockState);
        expect(wrapper.find(iconId).exists()).toBeTruthy();
        expect(wrapper.text().includes(`${text} @${mockUserTweetAdditionalInfo.author.username}`)).toBe(true);
        wrapper.find("#onMuteUser").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 1, tweetId: 1 },
            type: UserActionsType.PROCESS_USER_TO_MUTELIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockUserTweetAdditionalInfo.author.username} has been ${snackbarText}.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    };
});
