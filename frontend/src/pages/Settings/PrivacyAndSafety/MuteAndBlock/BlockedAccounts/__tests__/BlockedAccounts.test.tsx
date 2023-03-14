import React from "react";
import {Link as MuiLink} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";

import BlockedAccounts from "../BlockedAccounts";
import BlockedAccountItem from "../BlockedAccountItem/BlockedAccountItem";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../../../../util/test-utils/test-helper";
import {
    BlockedAndMutedUsersActionsType
} from "../../../../../../store/ducks/blockedAndMutedUsers/contracts/actionTypes";
import Spinner from "../../../../../../components/Spinner/Spinner";
import {ADVANCED_TWITTER_BLOCK_OPTIONS, BLOCKING_AND_UNBLOCKING_ACCOUNTS} from "../../../../../../constants/url-constants";
import {mockBlockedUsers} from "../../../../../../util/test-utils/mock-test-data";
import {LoadingStatus} from "../../../../../../types/common";

describe("BlockedAccounts", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<BlockedAccounts/>, createMockRootState());

        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly empty BlockedAccounts", () => {
        const wrapper = mountWithStore(<BlockedAccounts/>, mockStore);

        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.text().includes("You aren’t blocking anyone")).toBe(true);
        expect(wrapper.text().includes("When you block someone, that person won’t be able to follow or message you")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(BLOCKING_AND_UNBLOCKING_ACCOUNTS);
        expect(wrapper.find(MuiLink).at(1).prop("href")).toBe(BLOCKING_AND_UNBLOCKING_ACCOUNTS);
        expect(mockDispatchFn).nthCalledWith(1, {payload: 0, type: BlockedAndMutedUsersActionsType.FETCH_BLOCKED_USERS});
    });

    it("should render correctly BlockedAccounts", () => {
        const wrapper = mountWithStore(<BlockedAccounts/>, {
            ...mockStore, 
            blockedAndMutedUsers: {...mockStore.blockedAndMutedUsers, blockedUsers: mockBlockedUsers}
        });
        expect(wrapper.find(BlockedAccountItem).length).toEqual(2);
    });

    it("should change tab", () => {
        const wrapper = mountWithStore(<BlockedAccounts/>, mockStore);
        
        wrapper.find(Tab).at(1).simulate("click");

        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(1).text().includes("Imported")).toBe(true);
        expect(wrapper.text().includes("You haven’t imported a list of accounts to block")).toBe(true);
        expect(wrapper.text().includes("Find out how you can import a block list.")).toBe(true);
        expect(wrapper.find(MuiLink).at(1).prop("href")).toBe(ADVANCED_TWITTER_BLOCK_OPTIONS);
    });

    it("should unmount BlockedAccounts", () => {
        const wrapper = mountWithStore(<BlockedAccounts/>, mockStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(2, {type: BlockedAndMutedUsersActionsType.RESET_TAGS_STATE});
    });
});
