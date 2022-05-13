import React from "react";
import ReactRouter from "react-router";
import routeData from "react-router";
import {Avatar} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import InfiniteScroll from "react-infinite-scroll-component";

import UserPage from "../UserPage";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {UserProfileActionsType} from "../../../store/ducks/userProfile/contracts/actionTypes";
import {mockTweets, mockUser} from "../../../util/mockData/mockData";
import Spinner from "../../../components/Spinner/Spinner";
import UserNotFound from "../UserNotFound/UserNotFound";
import {PROFILE} from "../../../util/pathConstants";
import SetupProfileModal from "../../SetupProfileModal/SetupProfileModal";
import {UserTweetsActionType} from "../../../store/ducks/userTweets/contracts/actionTypes";

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
        const wrapper = mountWithStore(<UserPage/>, createMockRootState());

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
        console.log(wrapper.debug())

        expect(wrapper.text().includes(`${mockUserWithSingleCount.mediaTweetCount} Photo & video`)).toBe(true);
    });
    // |    74.4 |     43.4 |   44.68 |   72.25 | 143-150,186-197,211,226,230,234,238,243,250-256,282-283,287-289,293-297,301,305,309,404-462 
    it("should scroll and fetch User Tweets", () => {
        const wrapper = mountWithStore(<UserPage/>, mockWithTweets);
        
        // @ts-ignore
        wrapper.find(InfiniteScroll).prop("next")(jest.fn());

        expect(mockDispatchFn).nthCalledWith(4, {
            payload: {userId: "2", page: 1},
            type: UserTweetsActionType.FETCH_TWEETS
        });
    });
    
    it("should unmount UserPage", () => {
        const wrapper = mountWithStore(<UserPage/>, mockRootState);

        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(4, {type: UserProfileActionsType.RESET_USER_PROFILE_STATE});
        expect(mockDispatchFn).nthCalledWith(5, {type: UserTweetsActionType.RESET_TWEETS});
        expect(mockDispatchFn).nthCalledWith(6, {type: UserProfileActionsType.RESET_IMAGES_STATE});
        expect(mockDispatchFn).nthCalledWith(7, {type: UserTweetsActionType.RESET_TWEETS});
    });
});
