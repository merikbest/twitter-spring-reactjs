import React from "react";
import ReactRouter from "react-router";
import routeData from "react-router";
import { Avatar, Button, IconButton } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import InfiniteScroll from "react-infinite-scroll-component";
import { createMemoryHistory } from "history";
import { Link } from "react-router-dom";

import UserPage from "../UserPage";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { UserProfileActionsType } from "../../../store/ducks/userProfile/contracts/actionTypes";
import { mockTweets, mockUser, mockUserProfile } from "../../../util/test-utils/mock-test-data";
import Spinner from "../../../components/Spinner/Spinner";
import UserNotFound from "../UserNotFound/UserNotFound";
import { MESSAGES, PROFILE, PROFILE_HEADER_PHOTO, PROFILE_PHOTO, USER } from "../../../constants/path-constants";
import SetupProfileModal from "../EditProfileButton/SetupProfileModal/SetupProfileModal";
import { UserTweetsActionType } from "../../../store/ducks/userTweets/contracts/actionTypes";
import ProfilePictureModal from "../EditProfileButton/SetupProfileModal/ProfilePictureModal/ProfilePictureModal";
import EditProfileModal from "../EditProfileButton/EditProfileModal/EditProfileModal";
import CloseButton from "../../../components/CloseButton/CloseButton";
import { UserActionsType } from "../../../store/ducks/user/contracts/actionTypes";
import HoverAction from "../../../components/HoverAction/HoverAction";
import { ChatsActionsType } from "../../../store/ducks/chats/contracts/actionTypes";
import BlockUserModal from "../../../components/BlockUserModal/BlockUserModal";
import { RootState } from "../../../store/store";
import { LoadingStatus } from "../../../types/common";
import { ActionSnackbarTypes } from "../../../store/ducks/actionSnackbar/contracts/actionTypes";

window.scrollTo = jest.fn();

describe("UserPage", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUserWithSingleCount = { ...mockUser, tweetCount: 1, mediaTweetCount: 1, likeCount: 1 };
    const mockWithSingleTweetsCount = {
        ...mockRootState,
        userProfile: { ...mockRootState.userProfile, user: mockUserWithSingleCount }
    };
    const mockWithTweets = {
        ...mockRootState,
        userTweets: { ...mockRootState.userTweets, items: mockTweets, pagesCount: 10 }
    };
    const mockUserProfileState = {
        ...mockRootState,
        user: { ...mockRootState.user, status: LoadingStatus.LOADED },
        userProfile: { ...mockRootState.userProfile, user: mockUserProfile }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ userId: "2" });
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: `${PROFILE}/2`, hash: "", search: "", state: { isRegistered: false }
        });
    });

    it("should fetch user and images", () => {
        mountWithStore(<UserPage />, createMockRootState());

        expect(mockDispatchFn).nthCalledWith(1, { payload: 2, type: UserProfileActionsType.FETCH_USER });
        expect(mockDispatchFn).nthCalledWith(2, { payload: 2, type: UserProfileActionsType.FETCH_IMAGES });
    });

    it("should render UserNotFound", () => {
        const mockErrorState = createMockRootState(LoadingStatus.ERROR);
        const mockEmptyUser = { ...mockErrorState, user: { ...mockErrorState.user, data: undefined } };
        const wrapper = mountWithStore(<UserPage />, mockEmptyUser);

        expect(wrapper.find(UserNotFound).exists()).toBe(true);
        expect(wrapper.text().includes("This account doesn’t exist")).toBe(true);
        expect(wrapper.text().includes("Try searching for another.")).toBe(true);
    });

    it("should render correctly My profile when tweets loading", () => {
        const wrapper = mountWithStore(<UserPage />, createMockRootState());

        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockUser.wallpaper);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.text().includes(mockUser.about)).toBe(true);
        expect(wrapper.text().includes(mockUser.location)).toBe(true);
        expect(wrapper.text().includes(mockUser.website)).toBe(true);
        expect(wrapper.text().includes(`Date of Birth: ${mockUser.birthday}`)).toBe(true);
        expect(wrapper.text().includes("Joined: August 2021")).toBe(true);
        expect(wrapper.text().includes(`${mockUser.followersSize} Following`)).toBe(true);
        expect(wrapper.text().includes(`${mockUser.followingSize} Followers`)).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should visible SetupProfile modal", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: PROFILE + "/2", hash: "", search: "", state: { isRegistered: true }
        });
        const wrapper = mountWithStore(<UserPage />, {
            ...mockRootState,
            user: { ...mockRootState.user, status: LoadingStatus.LOADED }
        });
        expect(wrapper.find(SetupProfileModal).exists()).toBe(true);
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(true);
    });

    it("should User Profile Success Loaded", () => {
        const wrapper = mountWithStore(<UserPage />, mockRootState);

        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { userId: "2", page: 0 },
            type: UserTweetsActionType.FETCH_TWEETS
        });
        expect(wrapper.find(Tab).at(0).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes("Tweets")).toBe(true);
        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(false);
        expect(wrapper.find(Tab).at(1).text().includes("Tweets & replies")).toBe(true);
        expect(wrapper.find(Tab).at(2).prop("selected")).toBe(false);
        expect(wrapper.find(Tab).at(2).text().includes("Media")).toBe(true);
        expect(wrapper.find(Tab).at(3).prop("selected")).toBe(false);
        expect(wrapper.find(Tab).at(3).text().includes("Likes")).toBe(true);
    });

    it("should click tweet Tab and fetch user tweets", () => {
        testClickTab(0, `${mockUser.tweetCount} Tweets`, "Tweets", UserTweetsActionType.FETCH_TWEETS);
    });

    it("should click Tweets & replies Tab and fetch user tweets", () => {
        testClickTab(1, `${mockUser.tweetCount} Tweets`, "Tweets & replies", UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES);
    });

    it("should click Media Tab and fetch user tweets", () => {
        testClickTab(2, `${mockUser.mediaTweetCount} Photos & videos`, "Media", UserTweetsActionType.FETCH_MEDIA_TWEETS);
    });

    it("should click Likes Tab and fetch user tweets", () => {
        testClickTab(3, `${mockUser.likeCount} Likes`, "Likes", UserTweetsActionType.FETCH_LIKED_TWEETS);
    });

    it("should show tweets count", () => {
        const wrapper = mountWithStore(<UserPage />, mockRootState);
        expect(wrapper.text().includes(`${mockUser.tweetCount} Tweets`)).toBe(true);
    });

    it("should show single Tweet count", () => {
        testShowSingleTweetCount(1, `${mockUserWithSingleCount.tweetCount} Tweet`);
    });

    it("should show single Photo & video count", () => {
        testShowSingleTweetCount(2, `${mockUserWithSingleCount.mediaTweetCount} Photo & video`);
    });

    it("should show single Like count", () => {
        testShowSingleTweetCount(3, `${mockUserWithSingleCount.likeCount} Like`);
    });

    it("should unmount UserPage", () => {
        const wrapper = mountWithStore(<UserPage />, mockRootState);

        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(4, { type: UserProfileActionsType.RESET_USER_PROFILE_STATE });
        expect(mockDispatchFn).nthCalledWith(5, { type: UserTweetsActionType.RESET_TWEETS });
        expect(mockDispatchFn).nthCalledWith(6, { type: UserProfileActionsType.RESET_IMAGES_STATE });
        expect(mockDispatchFn).nthCalledWith(7, { type: UserTweetsActionType.RESET_TWEETS });
    });

    it("should click on Setup profile button and close", () => {
        const wrapper = mountWithStore(<UserPage />, {
            ...mockRootState,
            user: { ...mockRootState.user, status: LoadingStatus.LOADED }
        });

        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(false);
        expect(wrapper.find(Button).at(0).text()).toEqual("Setup profile");

        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(true);

        wrapper.find(SetupProfileModal).find(ProfilePictureModal).find(".MuiBackdrop-root").simulate("click");
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(false);
    });

    it("should click on Edit profile button and close", () => {
        const wrapper = mountWithStore(<UserPage />, {
            ...mockRootState,
            user: {
                ...mockRootState.user,
                data: { ...mockRootState.user.data, profileCustomized: true },
                status: LoadingStatus.LOADED
            }
        });

        expect(wrapper.find(EditProfileModal).prop("visible")).toBe(false);
        expect(wrapper.find(Button).at(0).text()).toEqual("Edit profile");

        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(EditProfileModal).prop("visible")).toBe(true);

        wrapper.find(EditProfileModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(false);
    });

    it("should click follow to private user profile", () => {
        const wrapper = mountWithStore(<UserPage />, {
            ...mockUserProfileState,
            userProfile: {
                ...mockUserProfileState.userProfile,
                user: { ...mockUserProfileState.userProfile.user, isPrivateProfile: true, isFollower: false }
            }
        });

        expect(wrapper.find(Button).at(0).text()).toEqual("Follow");

        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, { payload: 1, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });

    it("should click follow to user profile", () => {
        const wrapper = mountWithStore(<UserPage />, {
            ...mockUserProfileState,
            userProfile: {
                ...mockUserProfileState.userProfile,
                user: { ...mockUserProfileState.userProfile.user, isFollower: false }
            }
        });

        expect(wrapper.find(Button).at(0).text()).toEqual("Follow");

        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, { payload: { userId: 1 }, type: UserActionsType.FOLLOW_USER });
    });

    it("should click unfollow to user profile", () => {
        const wrapper = mountWithStore(<UserPage />, mockUserProfileState);

        expect(wrapper.find(Button).at(0).text()).toEqual("Following");

        wrapper.find(Button).at(0).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unfollow")).toBe(true);

        wrapper.find(Button).at(0).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, { payload: { userId: 1 }, type: UserActionsType.UNFOLLOW_USER });
    });

    it("should click user waiting for approve", () => {
        const wrapper = mountWithStore(<UserPage />, {
            ...mockUserProfileState,
            userProfile: {
                ...mockUserProfileState.userProfile,
                user: { ...mockUserProfileState.userProfile.user, isWaitingForApprove: true, isFollower: false }
            }
        });

        expect(wrapper.find(Button).at(0).text()).toEqual("Pending");

        wrapper.find(Button).at(0).simulate("mouseover");
        expect(wrapper.find(Button).at(0).text().includes("Cancel")).toBe(true);

        wrapper.find(Button).at(0).simulate("mouseleave");
        expect(wrapper.find(Button).at(0).text().includes("Pending")).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, { payload: 1, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });

    it("should click Add User To Chat", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<UserPage />, mockUserProfileState, history);

        wrapper.find(IconButton).at(2).simulate("click");

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(MESSAGES);
        expect(mockDispatchFn).nthCalledWith(4, { payload: 1, type: ChatsActionsType.CREATE_CHAT });
    });

    it("should hover Message icon and render Hover Action", () => {
        testHoverAction(2, "Message");
    });

    it("should click mute user", () => {
        const wrapper = mountWithStore(<UserPage />, mockUserProfileState);
        wrapper.find(IconButton).at(1).simulate("click");
        wrapper.find("#handleMuteUser").at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, {
            payload: { userId: 1 },
            type: UserActionsType.PROCESS_USER_TO_MUTELIST
        });
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: `@${mockUserProfile.username} has been muted.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click unmute user", () => {
        const wrapper = mountWithStore(<UserPage />, {
            ...mockUserProfileState,
            userProfile: {
                ...mockUserProfileState.userProfile,
                user: { ...mockUserProfileState.userProfile.user, isUserMuted: true }
            }
        });

        expect(wrapper.text().includes("You have muted Tweets from this account.")).toBe(true);

        wrapper.find("#unmuteUser").at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, {
            payload: { userId: 1 },
            type: UserActionsType.PROCESS_USER_TO_MUTELIST
        });
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: `@${mockUserProfile.username} has been unmuted.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click block user", () => {
        const wrapper = mountWithStore(<UserPage />, mockUserProfileState);

        wrapper.find(IconButton).at(1).simulate("click");
        wrapper.find("#openBlockUserModal").at(0).simulate("click");

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);

        wrapper.find(BlockUserModal).find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, {
            payload: { userId: 1 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: `@${mockUserProfile.username} has been blocked.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click unblock user", () => {
        const wrapper = mountWithStore(<UserPage />, {
            ...mockUserProfileState,
            userProfile: {
                ...mockUserProfileState.userProfile,
                user: { ...mockUserProfileState.userProfile.user, isUserBlocked: true }
            }
        });

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);

        wrapper.find(Button).at(0).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unblock")).toBe(true);

        wrapper.find(Button).at(0).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Block")).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);

        wrapper.find(BlockUserModal).find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, {
            payload: { userId: 1 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: `@${mockUserProfile.username} has been unblocked.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should open block user modal window and close", () => {
        const wrapper = mountWithStore(<UserPage />, {
            ...mockUserProfileState,
            userProfile: {
                ...mockUserProfileState.userProfile,
                user: { ...mockUserProfileState.userProfile.user, isUserBlocked: true }
            }
        });

        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);

        wrapper.find(BlockUserModal).find(Button).at(1).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
    });

    it("should Subscribe To Notifications", () => {
        const wrapper = mountWithStore(<UserPage />, mockUserProfileState);

        wrapper.find(IconButton).at(3).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, { payload: 1, type: UserProfileActionsType.PROCESS_SUBSCRIBE });
    });

    it("should hover Subscribe icon and render Hover Action", () => {
        testHoverAction(3, "Notify");
    });

    it("should hover Unsubscribe icon and render Hover Action", () => {
        testHoverAction(3, "Turn off notifications", {
            ...mockUserProfileState,
            userProfile: {
                ...mockUserProfileState.userProfile,
                user: { ...mockUserProfileState.userProfile.user, isSubscriber: true }
            }
        });
    });

    it("should link to profile header photo", () => {
        testLinkToPhoto(0, `${PROFILE_HEADER_PHOTO}/${mockUserProfile.id}`, mockUserProfile.wallpaper);
    });

    it("should link profile photo", () => {
        testLinkToPhoto(1, `${PROFILE_PHOTO}/${mockUserProfile.id}`, mockUserProfile.avatar);
    });

    it("should link to Following user list", () => {
        testLinkToFollowers(2, "following");
    });

    it("should link to Followers user list", () => {
        testLinkToFollowers(3, "followers");
    });

    it("should scroll and fetch User Tweets", () => {
        testLoadUserTweets(0, UserTweetsActionType.FETCH_TWEETS);
    });

    it("should scroll and fetch User Retweets And Replies", () => {
        testLoadUserTweets(1, UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES);
    });

    it("should scroll and fetch User Media Tweets", () => {
        testLoadUserTweets(2, UserTweetsActionType.FETCH_MEDIA_TWEETS);
    });

    it("should scroll and fetch User Liked Tweets", () => {
        testLoadUserTweets(3, UserTweetsActionType.FETCH_LIKED_TWEETS);
    });

    const testClickTab = (tabIndex: number, tweetCount: string, tabText: string, typeAction: UserTweetsActionType): void => {
        const wrapper = mountWithStore(<UserPage />, mockRootState);

        expect(wrapper.find(Tab).at(tabIndex).prop("selected")).toBe(tabIndex === 0);

        wrapper.find(Tab).at(tabIndex).simulate("click");

        expect(wrapper.text().includes(tweetCount)).toBe(true);
        expect(wrapper.find(Tab).at(tabIndex).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(tabIndex).text().includes(tabText)).toBe(true);
        expect(mockDispatchFn).nthCalledWith(4, { type: UserTweetsActionType.RESET_TWEETS });
        expect(mockDispatchFn).nthCalledWith(5, { payload: { userId: "2", page: 0 }, type: typeAction });
    };

    const testShowSingleTweetCount = (tabIndex: number, tweetCountText: string): void => {
        const wrapper = mountWithStore(<UserPage />, mockWithSingleTweetsCount);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        expect(wrapper.text().includes(tweetCountText)).toBe(true);
    };

    const testHoverAction = (componentIndex: number, actionText: string, mockState: RootState = mockUserProfileState): void => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<UserPage />, mockState);
        wrapper.find(IconButton).at(componentIndex).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(componentIndex).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(componentIndex).prop("actionText")).toBe(actionText);
    };

    const testClickLink = (linkIndex: number) => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<UserPage />, mockUserProfileState, history);

        wrapper.find(Link).at(linkIndex).simulate("click", { button: 0 });

        return pushSpy;
    };

    const testLinkToPhoto = (linkIndex: number, pathname: string, imageSrc: string): void => {
        const pushSpy = testClickLink(linkIndex);
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({
            pathname: pathname,
            state: {
                background: { pathname: `${PROFILE}/2`, hash: "", search: "", state: { isRegistered: false } },
                imageSrc: imageSrc
            }
        });
    };

    const testLinkToFollowers = (linkIndex: number, linkTo: string): void => {
        const pushSpy = testClickLink(linkIndex);
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${USER}/${mockUserProfile.id}/${linkTo}`);
    };

    const testLoadUserTweets = (tabIndex: number, actionType: UserTweetsActionType): void => {
        const wrapper = mountWithStore(<UserPage />, mockWithTweets);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        wrapper.find(InfiniteScroll).prop("next")();
        expect(mockDispatchFn).nthCalledWith(5, { payload: { userId: "2", page: 0 }, type: actionType });
    };
});
