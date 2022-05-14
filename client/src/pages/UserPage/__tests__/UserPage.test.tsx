import React from "react";
import ReactRouter from "react-router";
import routeData from "react-router";
import {Avatar, Button, IconButton} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import InfiniteScroll from "react-infinite-scroll-component";

import UserPage from "../UserPage";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {UserProfileActionsType} from "../../../store/ducks/userProfile/contracts/actionTypes";
import {mockTweets, mockUser, mockUserProfile} from "../../../util/mockData/mockData";
import Spinner from "../../../components/Spinner/Spinner";
import UserNotFound from "../UserNotFound/UserNotFound";
import {MESSAGES, PROFILE, USER} from "../../../util/pathConstants";
import SetupProfileModal from "../../SetupProfileModal/SetupProfileModal";
import {UserTweetsActionType} from "../../../store/ducks/userTweets/contracts/actionTypes";
import ProfilePictureModal from "../../SetupProfileModal/ProfilePictureModal/ProfilePictureModal";
import EditProfileModal from "../../../components/EditProfileModal/EditProfileModal";
import CloseButton from "../../../components/CloseButton/CloseButton";
import {UserActionsType} from "../../../store/ducks/user/contracts/actionTypes";
import HoverAction from "../../../components/HoverAction/HoverAction";
import {ChatsActionsType} from "../../../store/ducks/chats/contracts/actionTypes";
import {createMemoryHistory} from "history";

window.scrollTo = jest.fn();

describe("UserPage", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUserWithSingleCount = {...mockUser, tweetCount: 1, mediaTweetCount: 1, likeCount: 1};
    const mockWithSingleTweetsCount = {
        ...mockRootState,
        userProfile: {...mockRootState.userProfile, user: mockUserWithSingleCount}
    };
    const mockWithTweets = {
        ...mockRootState,
        userTweets: {...mockRootState.userTweets, items: mockTweets, pagesCount: 10}
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: "2"});
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: PROFILE + "/2", hash: "", search: "", state: {isRegistered: false}
        });
    });

    it("should fetch user and images", () => {
        mountWithStore(<UserPage/>, createMockRootState());

        expect(mockDispatchFn).nthCalledWith(1, {payload: 2, type: UserProfileActionsType.FETCH_USER});
        expect(mockDispatchFn).nthCalledWith(2, {payload: 2, type: UserProfileActionsType.FETCH_IMAGES});
    });

    it("should render UserNotFound", () => {
        const mockErrorState = createMockRootState(LoadingStatus.ERROR);
        const mockEmptyUser = {...mockErrorState, user: {...mockErrorState.user, data: undefined}};
        const wrapper = mountWithStore(<UserPage/>, mockEmptyUser);

        expect(wrapper.find(UserNotFound).exists()).toBe(true);
        expect(wrapper.text().includes("This account doesn’t exist")).toBe(true);
        expect(wrapper.text().includes("Try searching for another.")).toBe(true);
    });

    it("should render correctly My profile when tweets loading", () => {
        const wrapper = mountWithStore(<UserPage/>, createMockRootState());

        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockUser.wallpaper.src);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar.src);
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
            pathname: PROFILE + "/2", hash: "", search: "", state: {isRegistered: true}
        });
        const wrapper = mountWithStore(<UserPage/>, createMockRootState());
        expect(wrapper.find(SetupProfileModal).exists()).toBe(true);
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(true);
    });

    it("should User Profile Success Loaded", () => {
        const wrapper = mountWithStore(<UserPage/>, createMockRootState(LoadingStatus.SUCCESS));

        expect(mockDispatchFn).nthCalledWith(3, {
            payload: {userId: "2", page: 0},
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
        const wrapper = mountWithStore(<UserPage/>, createMockRootState(LoadingStatus.SUCCESS));

        wrapper.find(Tab).at(0).simulate("click");

        expect(wrapper.text().includes(`${mockUser.tweetCount} Tweets`)).toBe(true);
        expect(wrapper.find(Tab).at(0).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes("Tweets")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(4, {type: UserTweetsActionType.RESET_TWEETS});
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: {userId: "2", page: 0},
            type: UserTweetsActionType.FETCH_TWEETS
        });
    });

    it("should click Tweets & replies Tab and fetch user tweets", () => {
        const wrapper = mountWithStore(<UserPage/>, createMockRootState(LoadingStatus.SUCCESS));

        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(false);

        wrapper.find(Tab).at(1).simulate("click");

        expect(wrapper.text().includes(`${mockUser.tweetCount} Tweets`)).toBe(true);
        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(1).text().includes("Tweets & replies")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(4, {type: UserTweetsActionType.RESET_TWEETS});
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: {userId: "2", page: 0},
            type: UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES
        });
    });

    it("should click Media Tab and fetch user tweets", () => {
        const wrapper = mountWithStore(<UserPage/>, createMockRootState(LoadingStatus.SUCCESS));

        expect(wrapper.find(Tab).at(2).prop("selected")).toBe(false);

        wrapper.find(Tab).at(2).simulate("click");

        expect(wrapper.text().includes(`${mockUser.mediaTweetCount} Photos & videos`)).toBe(true);
        expect(wrapper.find(Tab).at(2).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(2).text().includes("Media")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(4, {type: UserTweetsActionType.RESET_TWEETS});
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: {userId: "2", page: 0},
            type: UserTweetsActionType.FETCH_MEDIA_TWEETS
        });
    });

    it("should click Likes Tab and fetch user tweets", () => {
        const wrapper = mountWithStore(<UserPage/>, createMockRootState(LoadingStatus.SUCCESS));

        expect(wrapper.find(Tab).at(3).prop("selected")).toBe(false);

        wrapper.find(Tab).at(3).simulate("click");

        expect(wrapper.text().includes(`${mockUser.likeCount} Likes`)).toBe(true);
        expect(wrapper.find(Tab).at(3).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(3).text().includes("Likes")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(4, {type: UserTweetsActionType.RESET_TWEETS});
        expect(mockDispatchFn).nthCalledWith(5, {
            payload: {userId: "2", page: 0},
            type: UserTweetsActionType.FETCH_LIKED_TWEETS
        });
    });

    // should render my profile loading (LoadingStatus.LOADING and mockUser === undefined)

    it("should show tweets count", () => {
        const wrapper = mountWithStore(<UserPage/>, createMockRootState());
        expect(wrapper.text().includes(`${mockUser.tweetCount} Tweets`)).toBe(true);
    });

    it("should show single Tweet count", () => {
        const wrapper = mountWithStore(<UserPage/>, mockWithSingleTweetsCount);
        expect(wrapper.text().includes(`${mockUserWithSingleCount.tweetCount} Tweet`)).toBe(true);
    });

    it("should show single Like count", () => {
        const wrapper = mountWithStore(<UserPage/>, mockWithSingleTweetsCount);

        wrapper.find(Tab).at(3).simulate("click");

        expect(wrapper.text().includes(`${mockUserWithSingleCount.likeCount} Like`)).toBe(true);
    });

    it("should show single Photo & video count", () => {
        const wrapper = mountWithStore(<UserPage/>, mockWithSingleTweetsCount);

        wrapper.find(Tab).at(2).simulate("click");

        expect(wrapper.text().includes(`${mockUserWithSingleCount.mediaTweetCount} Photo & video`)).toBe(true);
    });

    it("should unmount UserPage", () => {
        const wrapper = mountWithStore(<UserPage/>, mockRootState);

        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(4, {type: UserProfileActionsType.RESET_USER_PROFILE_STATE});
        expect(mockDispatchFn).nthCalledWith(5, {type: UserTweetsActionType.RESET_TWEETS});
        expect(mockDispatchFn).nthCalledWith(6, {type: UserProfileActionsType.RESET_IMAGES_STATE});
        expect(mockDispatchFn).nthCalledWith(7, {type: UserTweetsActionType.RESET_TWEETS});
    });

    it("should click on Setup profile button and close", () => {
        const wrapper = mountWithStore(<UserPage/>, {
            ...mockRootState,
            user: {...mockRootState.user, status: LoadingStatus.LOADED}
        });

        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(false);
        expect(wrapper.find(Button).at(0).text()).toEqual("Setup profile");

        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(true);

        wrapper.find(SetupProfileModal).find(ProfilePictureModal).find(".MuiBackdrop-root").simulate("click");
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(false);
    });

    it("should click on Edit profile button and close", () => {
        const wrapper = mountWithStore(<UserPage/>, {
            ...mockRootState,
            user: {
                ...mockRootState.user,
                data: {...mockRootState.user.data, profileCustomized: true},
                status: LoadingStatus.LOADED,
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
        const wrapper = mountWithStore(<UserPage/>, {
            ...mockRootState,
            user: {
                ...mockRootState.user, status: LoadingStatus.LOADED},
            userProfile: {
                ...mockRootState.userProfile,
                user: {...mockUserProfile, isPrivateProfile: true, isFollower: false}
            }
        });
        
        expect(wrapper.find(Button).at(0).text()).toEqual("Follow");

        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, {payload: 1, type: UserActionsType.PROCESS_FOLLOW_REQUEST});
    });
    
    it("should click follow to user profile", () => {
        const wrapper = mountWithStore(<UserPage/>, {
            ...mockRootState,
            user: {
                ...mockRootState.user, status: LoadingStatus.LOADED},
            userProfile: {
                ...mockRootState.userProfile,
                user: {...mockUserProfile, isFollower: false}
            }
        });

        expect(wrapper.find(Button).at(0).text()).toEqual("Follow");

        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, {payload: {userId: 1}, type: UserActionsType.FOLLOW_USER});
    });
    
    it("should click unfollow to user profile", () => {
        const wrapper = mountWithStore(<UserPage/>, {
            ...mockRootState,
            user: {
                ...mockRootState.user, status: LoadingStatus.LOADED},
            userProfile: {
                ...mockRootState.userProfile,
                user: mockUserProfile
            }
        });

        expect(wrapper.find(Button).at(0).text()).toEqual("Following");

        wrapper.find(Button).at(0).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unfollow")).toBe(true);

        wrapper.find(Button).at(0).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
        
        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(4, {payload: {userId: 1}, type: UserActionsType.UNFOLLOW_USER});
    });

    it("should click Add User To Chat", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<UserPage/>, {
            ...mockRootState,
            user: {
                ...mockRootState.user, status: LoadingStatus.LOADED},
            userProfile: {
                ...mockRootState.userProfile,
                user: mockUserProfile
            }
        }, history);

        wrapper.find(IconButton).at(2).simulate("click");
        
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(MESSAGES);
        expect(mockDispatchFn).nthCalledWith(4, {payload: 1, type: ChatsActionsType.CREATE_CHAT});
    });
    
    it("should hover Message icon and render Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<UserPage/>, {
            ...mockRootState,
            user: {
                ...mockRootState.user, status: LoadingStatus.LOADED},
            userProfile: {
                ...mockRootState.userProfile,
                user: mockUserProfile
            }
        });
        wrapper.find(IconButton).at(2).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        
        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(2).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(2).prop("actionText")).toBe("Message");
    });
    // |    74.4 |     43.4 |   44.68 |   72.25 | 143-150,211,243,287-289,293-297,301,305,309,404-462
    
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

    const testLoadUserTweets = (tabIndex: number, actionType: UserTweetsActionType): void => {
        const wrapper = mountWithStore(<UserPage/>, mockWithTweets);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        wrapper.find(InfiniteScroll).prop("next")();
        expect(mockDispatchFn).nthCalledWith(5, {payload: {userId: "2", page: 0}, type: actionType});
    };
});
