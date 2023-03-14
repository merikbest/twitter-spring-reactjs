import React from "react";
import routeData from "react-router";
import { createMemoryHistory, MemoryHistory } from "history";
import { Button, IconButton } from "@material-ui/core";

import Home from "../Home";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import { UserActionsType } from "../../../store/ducks/user/contracts/actionTypes";
import { TweetsActionType } from "../../../store/ducks/tweets/contracts/actionTypes";
import AddTweetForm from "../../../components/AddTweetForm/AddTweetForm";
import TopTweetActions from "../TopTweetActions/TopTweetActions";
import { mockUser } from "../../../util/test-utils/mock-test-data";
import Welcome from "../../../components/Welcome/Welcome";
import { HOME } from "../../../constants/path-constants";
import { LoadingStatus } from "../../../types/common";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";

window.scrollTo = jest.fn();

describe("Home", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;
    let history: MemoryHistory<unknown>;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: HOME, hash: "", search: "", state: ""
        });
        history = createMemoryHistory({
            initialEntries: [{
                pathname: HOME,
                search: "",
                hash: "",
                state: undefined
            }]
        });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Home />, createMockRootState(), history);

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: LoadingStatus.NEVER,
            type: TweetsActionType.SET_LOADING_STATE
        });
        expect(mockDispatchFn).nthCalledWith(2, { type: UserActionsType.FETCH_USER_DATA });
        expect(mockDispatchFn).nthCalledWith(3, { payload: 0, type: TweetsActionType.FETCH_TWEETS });
        expect(wrapper.text().includes("Home")).toBe(true);
        expect(wrapper.find(AddTweetForm).exists()).toBe(true);
        expect(wrapper.find(AddTweetForm).prop("title")).toBe("What's happening?");
        expect(wrapper.find(AddTweetForm).prop("buttonName")).toBe("Tweet");
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should fetch Latest Tweets", () => {
        const wrapper = mountWithStore(<Home />, mockStore, history);
        wrapper.find(TopTweetActions).find(ActionIconButton).find(IconButton).simulate("click");
        wrapper.find(TopTweetActions).find("#switchTweets").at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(5, { payload: 0, type: TweetsActionType.FETCH_FOLLOWERS_TWEETS });
    });

    it("should fetch Top Tweets", () => {
        const wrapper = mountWithStore(<Home />, mockStore, history);
        wrapper.find(TopTweetActions).find(ActionIconButton).find(IconButton).simulate("click");
        wrapper.find(TopTweetActions).find("#switchTweets").at(0).simulate("click");
        wrapper.find(TopTweetActions).find("#switchTweets").at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(7, { payload: 0, type: TweetsActionType.FETCH_TWEETS });
    });

    it("should reset Home State", () => {
        const wrapper = mountWithStore(<Home />, mockStore, history);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(4, { type: TweetsActionType.RESET_TWEETS });
    });

    it("should render Welcome message", () => {
        const wrapper = mountWithStore(<Home />, {
            ...mockStore,
            user: {
                ...mockStore.user,
                data: { ...mockUser, profileStarted: false }
            }
        }, history);

        expect(wrapper.find(Welcome).exists()).toBe(true);
        expect(wrapper.find(Welcome).text().includes("Welcome to Twitter!")).toBe(true);
        expect(wrapper.find(Welcome).text().includes("This is the best place to see what’s happening in your world.")).toBe(true);
        expect(wrapper.find(Welcome).text().includes("Find some people and topics to follow now.")).toBe(true);
        expect(wrapper.find(Welcome).find(Button).text().includes("Let's go")).toBe(true);
    });
});
