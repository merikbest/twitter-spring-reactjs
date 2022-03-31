import Bookmarks from "../Bookmarks";
import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {mockData, mockUser} from "../../../util/mockData/mockData";
import Spinner from "../../../components/Spinner/Spinner";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";

window.scrollTo = jest.fn();

describe("Bookmarks", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADING);
    const mockUserState = {data: mockUser, status: LoadingStatus.LOADING};
    const mockTweetsState = {items: mockData, pagesCount: 1, loadingState: LoadingStatus.LOADING};

    it("should render loading Spinner", () => {
        const mockStore = {...mockRootState, user: mockUserState, tweets: mockTweetsState};
        const wrapper = mountWithStore(<Bookmarks/>, mockStore);
        expect(wrapper.text().includes("Bookmarks")).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render list of TweetComponent", () => {
        const mockStore = {
            ...mockRootState,
            user: mockUserState,
            tweets: {...mockTweetsState, loadingState: LoadingStatus.LOADED}
        };
        const wrapper = mountWithStore(<Bookmarks/>, mockStore);
        expect(wrapper.text().includes("Bookmarks")).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render empty list of TweetComponents", () => {
        const mockStore = {
            ...mockRootState,
            user: mockUserState,
            tweets: {...mockTweetsState, items: [], loadingState: LoadingStatus.LOADED}
        };
        const wrapper = mountWithStore(<Bookmarks/>, mockStore);
        expect(wrapper.text().includes("Bookmarks")).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.text().includes("You haven’t added any Tweets to your Bookmarks yet")).toBe(true);
        expect(wrapper.text().includes("When you do, they’ll show up here.")).toBe(true);
        expect(wrapper.find(TweetComponent).length).toEqual(0);
    });
});
