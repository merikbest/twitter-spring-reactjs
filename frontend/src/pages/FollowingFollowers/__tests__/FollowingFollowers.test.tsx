import React from "react";
import ReactRouter from "react-router";
import Tab from "@material-ui/core/Tab";
import { Button } from "@material-ui/core";
import { createMemoryHistory } from "history";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import FollowingFollowers from "../FollowingFollowers";
import Spinner from "../../../components/Spinner/Spinner";
import {
    createMockMyProfile,
    createMockUserProfile,
    mockMyProfile,
    mockUserProfile
} from "../../../util/test-utils/mock-test-data";
import UsersItem from "../../../components/UsersItem/UsersItem";
import { UserProfileActionsType } from "../../../store/ducks/userProfile/contracts/actionTypes";
import { UsersSearchActionsType } from "../../../store/ducks/usersSearch/contracts/actionTypes";
import { USER } from "../../../constants/path-constants";
import { LoadingStatus } from "../../../types/common";

describe("FollowingFollowers", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);
    const mockEmptyMyProfileFollowList = {
        ...mockStore,
        userProfile: { ...mockStore.userProfile, user: createMockMyProfile(0, 0) },
        usersSearch: { ...mockStore.usersSearch, followers: [] }
    };
    const mockEmptyUserFollowList = {
        ...mockStore,
        userProfile: { ...mockStore.userProfile, user: createMockUserProfile(0, 0) },
        usersSearch: { ...mockStore.usersSearch, followers: [] }
    };
    let mockDispatchFn: jest.Mock;
    const mockUserProfileId = "1";
    const mockMyProfileId = "2";
    const mockFollow = "following";

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const mockStore = createMockRootState();
        const mockEmptyFollowList = { ...mockStore, usersSearch: { ...mockStore.usersSearch, followers: [] } };
        const wrapper = mountWithStore(<FollowingFollowers />, mockEmptyFollowList);
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render list of Following users by myProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: mockMyProfileId, follow: mockFollow });
        const wrapper = mountWithStore(<FollowingFollowers />, mockStore);

        expect(global.window.document.title).toBe(documentTitleText("followed", mockMyProfile?.fullName, mockMyProfile?.username));
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: parseInt(mockMyProfileId),
            type: UserProfileActionsType.FETCH_USER
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { userId: mockMyProfileId, page: 0 },
            type: UsersSearchActionsType.FETCH_FOLLOWERS
        });
    });

    it("should render list of Followers users by myProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: mockMyProfileId, follow: "followers" });
        const wrapper = mountWithStore(<FollowingFollowers />, mockStore);

        expect(global.window.document.title).toBe(documentTitleText("following", mockMyProfile?.fullName, mockMyProfile?.username));
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: parseInt(mockMyProfileId),
            type: UserProfileActionsType.FETCH_USER
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { userId: mockMyProfileId, page: 0 },
            type: UsersSearchActionsType.FETCH_FOLLOWINGS
        });
    });

    it("should render empty list of Following users by myProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: mockMyProfileId, follow: mockFollow });
        const wrapper = mountWithStore(<FollowingFollowers />, mockEmptyMyProfileFollowList);

        expect(global.window.document.title).toBe(documentTitleText("followed", mockMyProfile?.fullName, mockMyProfile?.username));
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.text().includes("You aren’t following anyone yet")).toBe(true);
        expect(wrapper.text().includes("When you do, they’ll be listed here and you’ll see their Tweets in your timeline.")).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Find people to follow");
        expect(wrapper.find(UsersItem).length).toEqual(0);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: parseInt(mockMyProfileId),
            type: UserProfileActionsType.FETCH_USER
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { userId: mockMyProfileId, page: 0 },
            type: UsersSearchActionsType.FETCH_FOLLOWERS
        });
    });

    it("should render empty list of Followers users by myProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: mockMyProfileId, follow: "followers" });
        const wrapper = mountWithStore(<FollowingFollowers />, mockEmptyMyProfileFollowList);

        expect(global.window.document.title).toBe(documentTitleText("following", mockMyProfile?.fullName, mockMyProfile?.username));
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.text().includes("You don’t have any followers yet")).toBe(true);
        expect(wrapper.text().includes("When someone follows you, you’ll see them here.")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(0);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: parseInt(mockMyProfileId),
            type: UserProfileActionsType.FETCH_USER
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { userId: mockMyProfileId, page: 0 },
            type: UsersSearchActionsType.FETCH_FOLLOWINGS
        });
    });

    it("should render list of Following users by myProfile on Tab click", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: mockMyProfileId, follow: mockFollow });
        const wrapper = mountWithStore(<FollowingFollowers />, mockStore, history);
        const tab = wrapper.find(Tab).at(0);
        tab.simulate("click");

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${USER}/${mockMyProfileId}/following`);
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.find(Tab).at(0).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes("Following")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: parseInt(mockMyProfileId),
            type: UserProfileActionsType.FETCH_USER
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { userId: mockMyProfileId, page: 0 },
            type: UsersSearchActionsType.FETCH_FOLLOWERS
        });
        expect(mockDispatchFn).nthCalledWith(4, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: { userId: mockMyProfileId, page: 0 },
            type: UsersSearchActionsType.FETCH_FOLLOWERS
        });
    });

    it("should render list of Followers users by myProfile on Tab click", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: mockMyProfileId, follow: mockFollow });
        const wrapper = mountWithStore(<FollowingFollowers />, mockStore, history);
        const tab = wrapper.find(Tab).at(1);
        tab.simulate("click");

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${USER}/${mockMyProfileId}/followers`);
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(1).text().includes("Followers")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: parseInt(mockMyProfileId),
            type: UserProfileActionsType.FETCH_USER
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { userId: mockMyProfileId, page: 0 },
            type: UsersSearchActionsType.FETCH_FOLLOWERS
        });
        expect(mockDispatchFn).nthCalledWith(4, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: { userId: mockMyProfileId, page: 0 },
            type: UsersSearchActionsType.FETCH_FOLLOWINGS
        });
    });

    it("should render empty list of Following users by userProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: mockUserProfileId, follow: mockFollow });
        const wrapper = mountWithStore(<FollowingFollowers />, mockEmptyUserFollowList);

        expect(global.window.document.title).toBe(documentTitleText("followed", mockUserProfile?.fullName, mockUserProfile?.username));
        expect(wrapper.text().includes(mockUserProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockUserProfile.username}`)).toBe(true);
        expect(wrapper.text().includes(`@${mockUserProfile.username} isn’t following anyone`)).toBe(true);
        expect(wrapper.text().includes("When they do, they’ll be listed here.")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(0);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: parseInt(mockUserProfileId),
            type: UserProfileActionsType.FETCH_USER
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { userId: mockUserProfileId, page: 0 },
            type: UsersSearchActionsType.FETCH_FOLLOWERS
        });
    });

    it("should render empty list of Followers users by userProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: mockUserProfileId, follow: "followers" });
        const wrapper = mountWithStore(<FollowingFollowers />, mockEmptyUserFollowList);

        expect(global.window.document.title).toBe(documentTitleText("following", mockUserProfile?.fullName, mockUserProfile?.username));
        expect(wrapper.text().includes(mockUserProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockUserProfile.username}`)).toBe(true);
        expect(wrapper.text().includes(`@${mockUserProfile.username} doesn’t have any followers`)).toBe(true);
        expect(wrapper.text().includes("When someone follows them, they’ll be listed here.")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(0);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: parseInt(mockUserProfileId),
            type: UserProfileActionsType.FETCH_USER
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { userId: mockUserProfileId, page: 0 },
            type: UsersSearchActionsType.FETCH_FOLLOWINGS
        });
    });

    it("should reset FollowingFollowers page", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: mockUserProfileId, follow: "followers" });
        const wrapper = mountWithStore(<FollowingFollowers />, createMockRootState());
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: UsersSearchActionsType.RESET_USERS_STATE });
        expect(mockDispatchFn).nthCalledWith(3, { type: UserProfileActionsType.RESET_USER_PROFILE_STATE });
    });

    const documentTitleText = (follow: string, fullName: string, username: string): string => {
        return `People ${follow} by ${fullName} (@${username}) / Twitter`;
    };
});
