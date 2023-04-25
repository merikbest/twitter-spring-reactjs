import React from "react";
import { Dialog } from "@material-ui/core";

import { LoadingStatus } from "../../../../../types/common";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import FollowerRequestsModal from "../FollowerRequestsModal";
import { FollowerRequestsActionsType } from "../../../../../store/ducks/followerRequests/contracts/actionTypes";
import { mockFollowerUserResponse, mockUser } from "../../../../../util/test-utils/mock-test-data";
import Spinner from "../../../../Spinner/Spinner";
import FollowerRequestsItem from "../FollowerRequestsItem/FollowerRequestsItem";

describe("FollowerRequestsModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty Follower Requests", () => {
        const wrapper = mountWithStore(<FollowerRequestsModal visible={true} onClose={jest.fn()} />, mockRootState);

        expect(wrapper.text().includes("Follower requests")).toBe(true);
        expect(wrapper.text().includes("You don’t have any follower requests")).toBe(true);
        expect(wrapper.text().includes("When someone requests to follow you, it’ll show up here.")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: 0,
            type: FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS
        });
    });

    it("should render loading Spinner", () => {
        const mockRootState = createMockRootState(LoadingStatus.LOADING);
        const mockState = {
            ...mockRootState,
            user: { ...mockRootState.user, data: { ...mockUser, followerRequestsSize: 2 } }
        };
        const wrapper = mountWithStore(<FollowerRequestsModal visible={true} onClose={jest.fn()} />, mockState);

        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render Follower Requests Items", () => {
        const mockState = {
            ...mockRootState,
            user: { ...mockRootState.user, data: { ...mockUser, followerRequestsSize: 2 } },
            followerRequests: { ...mockRootState.followerRequests, items: mockFollowerUserResponse }
        };
        const wrapper = mountWithStore(<FollowerRequestsModal visible={true} onClose={jest.fn()} />, mockState);

        expect(wrapper.find(FollowerRequestsItem).length).toEqual(2);
    });

    it("should render empty FollowerRequestsModal", () => {
        const wrapper = mountWithStore(<FollowerRequestsModal visible={false} onClose={jest.fn()} />, mockRootState);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should unmount FollowerRequestsModal", () => {
        const wrapper = mountWithStore(<FollowerRequestsModal visible onClose={jest.fn()} />, mockRootState);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: FollowerRequestsActionsType.RESET_FOLLOWER_REQUESTS_STATE });
    });
});
