import ReactRouter from "react-router";
import Tab from "@material-ui/core/Tab";
import {Button} from "@material-ui/core";
import {createMemoryHistory} from "history";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import FollowingFollowers from "../FollowingFollowers";
import Spinner from "../../../components/Spinner/Spinner";
import {
    createMockMyProfile,
    createMockUserProfile,
    mockMyProfile,
    mockUserProfile
} from "../../../util/mockData/mockData";
import {LoadingStatus} from "../../../store/types";
import UsersItem from "../../../components/UsersItem/UsersItem";
import {RootState} from "../../../store/store";
import {UserProfileActionsType} from "../../../store/ducks/userProfile/contracts/actionTypes";
import {UsersSearchActionsType} from "../../../store/ducks/usersSearch/contracts/actionTypes";

describe("FollowingFollowers", () => {
    const mockStore: RootState = createMockRootState(LoadingStatus.LOADED);
    const mockEmptyMyProfileFollowList: RootState = {
        ...mockStore,
        userProfile: {...mockStore.userProfile, user: createMockMyProfile(0, 0)},
        usersSearch: {...mockStore.usersSearch, followers: []}
    };
    const mockEmptyUserFollowList: RootState = {
        ...mockStore,
        userProfile: {...mockStore.userProfile, user: createMockUserProfile(0, 0)},
        usersSearch: {...mockStore.usersSearch, followers: []}
    };
    let mockDispatchFn: jest.Mock;
    const mockUserProfileId: string = "1";
    const mockMyProfileId: string = "2";
    const mockFollow: string = "following";

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<FollowingFollowers/>, createMockRootState());
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render list of Following users by myProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: mockMyProfileId, follow: mockFollow});
        const wrapper = mountWithStore(<FollowingFollowers/>, mockStore);

        expect(global.window.document.title).toBe(documentTitleText("followed", mockMyProfile?.fullName, mockMyProfile?.username));
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(1, {payload: parseInt(mockMyProfileId), type: UserProfileActionsType.FETCH_USER});
        expect(mockDispatchFn).nthCalledWith(2, {payload: mockMyProfileId, type: UsersSearchActionsType.FETCH_FOLLOWERS});
    });

    it("should render list of Followers users by myProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: mockMyProfileId, follow: "followers"});
        const wrapper = mountWithStore(<FollowingFollowers/>, mockStore);

        expect(global.window.document.title).toBe(documentTitleText("following", mockMyProfile?.fullName, mockMyProfile?.username));
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(1, {payload: parseInt(mockMyProfileId), type: UserProfileActionsType.FETCH_USER});
        expect(mockDispatchFn).nthCalledWith(2, {payload: mockMyProfileId, type: UsersSearchActionsType.FETCH_FOLLOWINGS});
    });

    it("should render empty list of Following users by myProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: mockMyProfileId, follow: mockFollow});
        const wrapper = mountWithStore(<FollowingFollowers/>, mockEmptyMyProfileFollowList);

        expect(global.window.document.title).toBe(documentTitleText("followed", mockMyProfile?.fullName, mockMyProfile?.username));
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.text().includes("You aren’t following anyone yet")).toBe(true);
        expect(wrapper.text().includes("When you do, they’ll be listed here and you’ll see their Tweets in your timeline.")).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Find people to follow");
        expect(wrapper.find(UsersItem).length).toEqual(0);
        expect(mockDispatchFn).nthCalledWith(1, {payload: parseInt(mockMyProfileId), type: UserProfileActionsType.FETCH_USER});
        expect(mockDispatchFn).nthCalledWith(2, {payload: mockMyProfileId, type: UsersSearchActionsType.FETCH_FOLLOWERS});
    });

    it("should render empty list of Followers users by myProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: mockMyProfileId, follow: "followers"});
        const wrapper = mountWithStore(<FollowingFollowers/>, mockEmptyMyProfileFollowList);

        expect(global.window.document.title).toBe(documentTitleText("following", mockMyProfile?.fullName, mockMyProfile?.username));
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.text().includes("You don’t have any followers yet")).toBe(true);
        expect(wrapper.text().includes("When someone follows you, you’ll see them here.")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(0);
        expect(mockDispatchFn).nthCalledWith(1, {payload: parseInt(mockMyProfileId), type: UserProfileActionsType.FETCH_USER});
        expect(mockDispatchFn).nthCalledWith(2, {payload: mockMyProfileId, type: UsersSearchActionsType.FETCH_FOLLOWINGS});
    });

    it("should render list of Following users by myProfile on Tab click", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: mockMyProfileId, follow: mockFollow});
        const wrapper = mountWithStore(<FollowingFollowers/>, mockStore, history);
        const tab = wrapper.find(Tab).at(0);
        tab.simulate("click");

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`/user/${mockMyProfileId}/following`);
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.find(Tab).at(0).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes("Following")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(1, {payload: parseInt(mockMyProfileId), type: UserProfileActionsType.FETCH_USER});
        expect(mockDispatchFn).nthCalledWith(2, {payload: mockMyProfileId, type: UsersSearchActionsType.FETCH_FOLLOWERS});
        expect(mockDispatchFn).nthCalledWith(3, {payload: mockMyProfileId, type: UsersSearchActionsType.FETCH_FOLLOWERS});
    });

    it("should render list of Followers users by myProfile on Tab click", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: mockMyProfileId, follow: mockFollow});
        const wrapper = mountWithStore(<FollowingFollowers/>, mockStore, history);
        const tab = wrapper.find(Tab).at(1);
        tab.simulate("click");

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`/user/${mockMyProfileId}/followers`);
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(1).text().includes("Followers")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(1, {payload: parseInt(mockMyProfileId), type: UserProfileActionsType.FETCH_USER});
        expect(mockDispatchFn).nthCalledWith(2, {payload: mockMyProfileId, type: UsersSearchActionsType.FETCH_FOLLOWERS});
        expect(mockDispatchFn).nthCalledWith(3, {payload: mockMyProfileId, type: UsersSearchActionsType.FETCH_FOLLOWINGS});
    });

    it("should render empty list of Following users by userProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: mockUserProfileId, follow: mockFollow});
        const wrapper = mountWithStore(<FollowingFollowers/>, mockEmptyUserFollowList);

        expect(global.window.document.title).toBe(documentTitleText("followed", mockUserProfile?.fullName, mockUserProfile?.username));
        expect(wrapper.text().includes(mockUserProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockUserProfile.username}`)).toBe(true);
        expect(wrapper.text().includes(`@${mockUserProfile.username} isn’t following anyone`)).toBe(true);
        expect(wrapper.text().includes("When they do, they’ll be listed here.")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(0);
        expect(mockDispatchFn).nthCalledWith(1, {payload: parseInt(mockUserProfileId), type: UserProfileActionsType.FETCH_USER});
        expect(mockDispatchFn).nthCalledWith(2, {payload: mockUserProfileId, type: UsersSearchActionsType.FETCH_FOLLOWERS});
    });

    it("should render empty list of Followers users by userProfile", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: mockUserProfileId, follow: "followers"});
        const wrapper = mountWithStore(<FollowingFollowers/>, mockEmptyUserFollowList);

        expect(global.window.document.title).toBe(documentTitleText("following", mockUserProfile?.fullName, mockUserProfile?.username));
        expect(wrapper.text().includes(mockUserProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockUserProfile.username}`)).toBe(true);
        expect(wrapper.text().includes(`@${mockUserProfile.username} doesn’t have any followers`)).toBe(true);
        expect(wrapper.text().includes("When someone follows them, they’ll be listed here.")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(0);
        expect(mockDispatchFn).nthCalledWith(1, {payload: parseInt(mockUserProfileId), type: UserProfileActionsType.FETCH_USER});
        expect(mockDispatchFn).nthCalledWith(2, {payload: mockUserProfileId, type: UsersSearchActionsType.FETCH_FOLLOWINGS});
    });
    
    const documentTitleText = (follow: string, fullName: string, username: string,): string => {
        return `People ${follow} by ${fullName} (@${username}) / Twitter`
    };
});
