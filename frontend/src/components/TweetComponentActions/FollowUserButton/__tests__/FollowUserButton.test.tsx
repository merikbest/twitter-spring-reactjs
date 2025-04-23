import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import FollowUserButton from "../FollowUserButton";
import { mockUserTweetAdditionalInfo } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("FollowUserButton", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click follow", () => {
        testClickButton(false, "#followIcon", "Follow", UserActionsType.FOLLOW_USER);
    });

    it("should click unfollow", () => {
        testClickButton(true, "#unfollowIcon", "Unfollow", UserActionsType.UNFOLLOW_USER);
    });

    const testClickButton = (isFollower: boolean, iconId: string, text: string, actionType: UserActionsType): void => {
        const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
        const mockState = {
            ...mockRootState,
            tweetAdditionalInfo: {
                ...mockRootState.tweetAdditionalInfo,
                tweetAdditionalInfo: {
                    ...mockUserTweetAdditionalInfo,
                    author: {
                        ...mockUserTweetAdditionalInfo.author,
                        isFollower
                    }
                }
            }
        };
        const wrapper = mountWithStore(<FollowUserButton tweetId={1} />, mockState);
        expect(wrapper.find(iconId).exists()).toBeTruthy();
        expect(wrapper.text().includes(`${text} @${mockUserTweetAdditionalInfo.author.username}`)).toBe(true);
        wrapper.find("#handleFollow").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 1, tweetId: 1 },
            type: actionType
        });
    };
});
