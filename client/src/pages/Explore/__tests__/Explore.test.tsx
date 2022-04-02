import Tab from "@material-ui/core/Tab";
import routeData from 'react-router';
import * as redux from "react-redux";
import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import Spinner from "../../../components/Spinner/Spinner";
import {LoadingStatus} from "../../../store/types";
import {mockMediaTweets, mockVideoTweets} from "../../../util/mockData/mockData";
import Explore from "../Explore";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import UsersItem from "../../../components/UsersItem/UsersItem";
import {MainSearchTextField} from "../../../components/SearchTextField/MainSearchTextField";
import {TweetsActionType} from "../../../store/ducks/tweets/contracts/actionTypes";

window.scrollTo = jest.fn();

describe("Explore", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Explore/>, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render list of Top tweets", () => {
        const wrapper = mountWithStore(<Explore/>, mockStore);
        const tab = wrapper.find(Tab).at(0);
        tab.simulate("click");
        expect(wrapper.find(Tab).at(0).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes("Top")).toBe(true);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render list of Latest tweets", () => {
        const wrapper = mountWithStore(<Explore/>, mockStore);
        const tab = wrapper.find(Tab).at(1);
        tab.simulate("click");
        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(1).text().includes("Latest")).toBe(true);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render list of People", () => {
        const wrapper = mountWithStore(<Explore/>, mockStore);
        const tab = wrapper.find(Tab).at(2);
        tab.simulate("click");
        expect(wrapper.find(Tab).at(2).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(2).text().includes("People")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
    });

    it("should render list of Photos", () => {
        const mockTweetsWithPhotos = {items: mockMediaTweets, pagesCount: 1, loadingState: LoadingStatus.LOADED};
        const wrapper = mountWithStore(<Explore/>, {...mockStore, tweets: mockTweetsWithPhotos});
        const tab = wrapper.find(Tab).at(3);
        tab.simulate("click");
        expect(wrapper.find(Tab).at(3).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(3).text().includes("Photos")).toBe(true);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render list of Videos", () => {
        const mockTweetsWithVideos = {items: mockVideoTweets, pagesCount: 1, loadingState: LoadingStatus.LOADED};
        const wrapper = mountWithStore(<Explore/>, {...mockStore, tweets: mockTweetsWithVideos});
        const tab = wrapper.find(Tab).at(4);
        tab.simulate("click");
        expect(wrapper.find(Tab).at(4).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(4).text().includes("Videos")).toBe(true);
        expect(wrapper.find(TweetComponent).length).toEqual(1);
    });

    it("should render list of Tweets by input text", () => {
        const wrapper = mountWithStore(<Explore/>, mockStore);
        const input = wrapper.find(MainSearchTextField).find("input").at(0);
        input.simulate("change", {target: {value: "test"}});
        input.simulate("submit");
        expect(wrapper.find("input").prop("value")).toBe("test");
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render list of Tweets by tag", () => {
        const mockText = "#test tag";
        mockLocation({tag: mockText});
        const mockDispatchFn = mockDispatch();

        const wrapper = mountWithStore(<Explore/>, mockStore);
        expect(wrapper.find("input").prop("value")).toBe(mockText);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
        expect(mockDispatchFn).toHaveBeenCalledWith({
            payload: mockText,
            type: TweetsActionType.FETCH_TWEETS_BY_TAG
        });
    });

    it("should render list of Tweets by text", () => {
        const mockText = "test text";
        mockLocation({text: mockText});
        const mockDispatchFn = mockDispatch();

        const wrapper = mountWithStore(<Explore/>, mockStore);
        expect(wrapper.find("input").prop("value")).toBe(mockText);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
        expect(mockDispatchFn).toHaveBeenCalledWith({
            payload: mockText,
            type: TweetsActionType.FETCH_TWEETS_BY_TEXT
        });
    });

    const mockLocation = (mockLocationState: { tag: string } | { text: string }): void => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "/search",
            hash: "",
            search: "",
            state: mockLocationState
        });
    };

    const mockDispatch = () => {
        const useDispatchSpy = jest.spyOn(redux, "useDispatch");
        const mockDispatchFn = jest.fn();
        useDispatchSpy.mockReturnValue(mockDispatchFn);
        return mockDispatchFn;
    };
});
