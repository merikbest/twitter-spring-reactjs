import React from "react";
import Tab from "@material-ui/core/Tab";
import InfiniteScroll from "react-infinite-scroll-component";

import { createMockRootState, mockDispatch, mockLocation, mountWithStore } from "../../../util/test-utils/test-helper";
import Spinner from "../../../components/Spinner/Spinner";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import UsersItem from "../../../components/UsersItem/UsersItem";
import { MainSearchTextField } from "../../../components/SearchTextField/MainSearchTextField";
import { TweetsActionType } from "../../../store/ducks/tweets/contracts/actionTypes";
import { UsersSearchActionsType } from "../../../store/ducks/usersSearch/contracts/actionTypes";
import Explore from "../Explore";
import { LoadingStatus } from "../../../types/common";

window.scrollTo = jest.fn();

describe("Explore", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Explore />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render list of Top tweets", () => {
        testRenderItems(0, "Top", TweetComponent, TweetsActionType.FETCH_TWEETS);
    });

    it("should render list of Latest tweets", () => {
        testRenderItems(1, "Latest", TweetComponent, TweetsActionType.FETCH_TWEETS);
    });

    it("should render list of People", () => {
        testRenderItems(2, "People", UsersItem, UsersSearchActionsType.FETCH_USERS);
    });

    it("should render list of Photos", () => {
        testRenderItems(3, "Photos", TweetComponent, TweetsActionType.FETCH_MEDIA_TWEETS);
    });

    it("should render list of Videos", () => {
        testRenderItems(4, "Videos", TweetComponent, TweetsActionType.FETCH_TWEETS_WITH_VIDEO);
    });

    it("should render list of Tweets by input text", () => {
        testRenderItemsByInputText(0, TweetComponent, TweetsActionType.FETCH_TWEETS_BY_TEXT);
    });

    it("should render list of Users by input text", () => {
        testRenderItemsByInputText(2, UsersItem, UsersSearchActionsType.FETCH_USERS_BY_NAME);
    });

    it("should render list of Tweets by tag", () => {
        testRenderTweetsByLocation({ tag: "#test text" }, "#test text", TweetsActionType.FETCH_TWEETS_BY_TAG);
    });

    it("should render list of Tweets by text", () => {
        testRenderTweetsByLocation({ text: "test text" }, "test text", TweetsActionType.FETCH_TWEETS_BY_TEXT);
    });

    it("should scroll list of Tweets by input text", () => {
        testScrollItemsByInputText(0, TweetsActionType.FETCH_TWEETS_BY_TEXT);
    });

    it("should scroll list of Users by input text", () => {
        testScrollItemsByInputText(2, UsersSearchActionsType.FETCH_USERS_BY_NAME);
    });

    it("should scroll Top tweets tab", () => {
        testScrollItems(0, TweetsActionType.FETCH_TWEETS);
    });

    it("should scroll Latest tweets tab", () => {
        testScrollItems(1, TweetsActionType.FETCH_TWEETS);
    });

    it("should scroll People users tab", () => {
        testScrollItems(2, UsersSearchActionsType.FETCH_USERS);
    });

    it("should scroll Photos tweets tab", () => {
        testScrollItems(3, TweetsActionType.FETCH_MEDIA_TWEETS);
    });

    it("should scroll Videos tweets tab", () => {
        testScrollItems(4, TweetsActionType.FETCH_TWEETS_WITH_VIDEO);
    });

    it("should unmount Explore", () => {
        mockLocation({ mock: "" });
        const wrapper = mountWithStore(<Explore />, mockStore);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: TweetsActionType.RESET_TWEETS });
    });

    const testRenderItemsByInputText = (tabIndex: number, listItem: any, actionType: UsersSearchActionsType | TweetsActionType) => {
        const wrapper = mountWithStore(<Explore />, mockStore);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        const input = wrapper.find(MainSearchTextField).find("input").at(0);
        input.simulate("change", { target: { value: "test" } });
        input.simulate("submit");
        expect(wrapper.find("input").prop("value")).toBe("test");
        expect(wrapper.find(listItem).length).toEqual(2);
        expect(mockDispatchFn).toHaveBeenCalledWith({
            payload: tabIndex === 0 ? { text: "test", pageNumber: 0 } : { username: "test", pageNumber: 0 },
            type: actionType
        });
    };

    const testRenderTweetsByLocation = (location: { tag: string; } | { text: string; }, mockText: string, actionType: TweetsActionType): void => {
        mockLocation(location);
        const wrapper = mountWithStore(<Explore />, mockStore);
        expect(wrapper.find("input").prop("value")).toBe(mockText);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
        expect(mockDispatchFn).toHaveBeenCalledWith({ payload: { ...location, pageNumber: 0 }, type: actionType });
    };

    const testRenderItems = (tabIndex: number, tabIndexName: string, listItem: any, actionType: UsersSearchActionsType | TweetsActionType): void => {
        const wrapper = mountWithStore(<Explore />, mockStore);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        expect(wrapper.find(Tab).at(tabIndex).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(tabIndex).text().includes(tabIndexName)).toBe(true);
        expect(wrapper.find(listItem).length).toEqual(2);
        expect(mockDispatchFn).toHaveBeenCalledWith({ payload: 0, type: actionType });
    };

    const testScrollItemsByInputText = (tabIndex: number, actionType: UsersSearchActionsType | TweetsActionType): void => {
        mockLocation({ mock: "" });
        const wrapper = mountWithStore(<Explore />, mockStore);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        const input = wrapper.find(MainSearchTextField).find("input").at(0);
        input.simulate("change", { target: { value: "test" } });
        input.simulate("submit");
        wrapper.find(InfiniteScroll).prop("next")();
        expect(wrapper.find("input").prop("value")).toBe("test");
        expect(mockDispatchFn).toHaveBeenCalledWith({
            payload: tabIndex === 0 ? { text: "test", pageNumber: 0 } : { username: "test", pageNumber: 0 },
            type: actionType
        });
    };

    const testScrollItems = (tabIndex: number, actionType: UsersSearchActionsType | TweetsActionType): void => {
        mockLocation({ mock: "" });
        const wrapper = mountWithStore(<Explore />, mockStore);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        wrapper.find(InfiniteScroll).prop("next")();
        expect(mockDispatchFn).toHaveBeenCalledWith({ payload: 0, type: actionType });
    };
});
