import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {mockTweets, mockUser} from "../../../util/mockData/mockData";
import Spinner from "../../../components/Spinner/Spinner";
import Connect from "../Connect";
import {LoadingStatus} from "../../../store/types";
import UsersItem from "../../../components/UsersItem/UsersItem";

window.scrollTo = jest.fn();

describe("Connect", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADING);
    const mockUserState = {data: mockUser, status: LoadingStatus.LOADING};
    const mockUsersState = {users: mockTweets, loadingState: LoadingStatus.LOADING};
    
    it("should render loading Spinner", () => {
        const mockStore = {...mockRootState, user: mockUserState, users: mockUsersState};
        const wrapper = mountWithStore(<Connect/>, mockStore);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render list of UsersItem", () => {
        const mockStore = {
            ...mockRootState,
            user: mockUserState,
            users: {...mockUsersState, loadingState: LoadingStatus.SUCCESS}
        };
        const wrapper = mountWithStore(<Connect/>, mockStore);
        expect(wrapper.text().includes("Suggested for you")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
    });
});
