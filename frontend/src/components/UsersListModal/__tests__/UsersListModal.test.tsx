import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import Spinner from "../../Spinner/Spinner";
import { TweetActionType } from "../../../store/ducks/tweet/contracts/actionTypes";
import UsersItem from "../../UsersItem/UsersItem";
import CloseButton from "../../CloseButton/CloseButton";
import UsersListModal, { UsersListModalAction } from "../UsersListModal";
import { LoadingStatus } from "../../../types/common";

describe("UsersListModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render Loading spinner correctly", () => {
        const wrapper = mountUsersListModal(UsersListModalAction.LIKED, createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render Liked users", () => {
        const wrapper = mountUsersListModal(UsersListModalAction.LIKED);
        expect(wrapper.text().includes("Liked by")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { tweetId: 1, pageNumber: 0 },
            type: TweetActionType.FETCH_LIKED_USERS
        });
        expect(wrapper.find(UsersItem).length).toEqual(2);
    });

    it("should render Retweeted users", () => {
        const wrapper = mountUsersListModal(UsersListModalAction.RETWEETED);
        expect(wrapper.text().includes("Retweeted by")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { tweetId: 1, pageNumber: 0 },
            type: TweetActionType.FETCH_RETWEETED_USERS
        });
        expect(wrapper.find(UsersItem).length).toEqual(2);
    });

    it("should click close UsersListModal", () => {
        const wrapper = mountUsersListModal(UsersListModalAction.QUOTED);
        wrapper.find(CloseButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, { type: TweetActionType.RESET_LIKED_USERS_STATE });
        expect(mockDispatchFn).nthCalledWith(3, { type: TweetActionType.RESET_RETWEETED_USERS_STATE });
    });

    it("should render empty UsersListModal", () => {
        const wrapper = mountUsersListModal(UsersListModalAction.LIKED, mockRootState, false);
        expect(wrapper.find("div").exists()).toBeFalsy();
    });

    const mountUsersListModal = (usersListModalAction: UsersListModalAction, mockState = mockRootState, visible = true) => {
        return mountWithStore(
            <UsersListModal
                tweetId={1}
                usersListModalAction={usersListModalAction}
                visible={visible}
                onClose={jest.fn()}
            />, mockState);
    };
});
