import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import MutedAccounts from "../MutedAccounts";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import Spinner from "../../../../../../components/Spinner/Spinner";
import { TWITTER_MUTE } from "../../../../../../constants/url-constants";
import {
    BlockedAndMutedUsersActionsType
} from "../../../../../../store/ducks/blockedAndMutedUsers/contracts/actionTypes";
import { mockMutedUsers } from "../../../../../../util/test-utils/mock-test-data";
import MutedAccountItem from "../MutedAccountItem/MutedAccountItem";
import { LoadingStatus } from "../../../../../../types/common";

describe("MutedAccounts", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<MutedAccounts />, createMockRootState());

        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly empty MutedAccounts", () => {
        const wrapper = mountWithStore(<MutedAccounts />, mockStore);

        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.text().includes("Here’s everyone you muted. You can add or remove them from this list.")).toBe(true);
        expect(wrapper.text().includes("You aren’t muting anyone")).toBe(true);
        expect(wrapper.text().includes("When you mute accounts, you won’t see their Tweets in your timeline.")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(TWITTER_MUTE);
        expect(wrapper.find(MuiLink).at(1).prop("href")).toBe(TWITTER_MUTE);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: 0,
            type: BlockedAndMutedUsersActionsType.FETCH_MUTED_USERS
        });
    });

    it("should render correctly MutedAccounts", () => {
        const wrapper = mountWithStore(<MutedAccounts />, {
            ...mockStore,
            blockedAndMutedUsers: { ...mockStore.blockedAndMutedUsers, mutedUsers: mockMutedUsers }
        });
        expect(wrapper.find(MutedAccountItem).length).toEqual(2);
    });

    it("should unmount MutedAccounts", () => {
        const wrapper = mountWithStore(<MutedAccounts />, mockStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(2, { type: BlockedAndMutedUsersActionsType.RESET_TAGS_STATE });
    });
});
