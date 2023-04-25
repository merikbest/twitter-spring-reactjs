import React from "react";
import routeData from "react-router";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Button, IconButton, MuiThemeProvider, Popover } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { NavLink, Router } from "react-router-dom";

import { createMockRootState, mockDispatch } from "../../../util/test-utils/test-helper";
import { BOOKMARKS, HOME, LISTS, MESSAGES, NOTIFICATIONS, PROFILE, SEARCH } from "../../../constants/path-constants";
import { mockUser } from "../../../util/test-utils/mock-test-data";
import AddTweetModal from "../../AddTweetModal/AddTweetModal";
import CloseButton from "../../CloseButton/CloseButton";
import DisplayModal from "../SideMenuMoreItem/DisplayModal/DisplayModal";
import FollowerRequestsModal from "../SideMenuMoreItem/FollowerRequestsModal/FollowerRequestsModal";
import SideMenu from "../SideMenu";
import { LoadingStatus } from "../../../types/common";

describe("SideMenu", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "/test",
            hash: "",
            search: "",
            state: undefined
        });
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const { wrapper } = createSideMenuWrapper();

        expect(wrapper.find("#homeIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("Home")).toBe(true);
        expect(wrapper.find("#exploreIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("Explore")).toBe(true);
        expect(wrapper.find("#notificationsIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("Notifications")).toBe(true);
        expect(wrapper.find("#messagesIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("Messages")).toBe(true);
        expect(wrapper.find("#bookmarksIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("Bookmarks")).toBe(true);
        expect(wrapper.find("#listsIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("Lists")).toBe(true);
        expect(wrapper.find("#profileIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("Profile")).toBe(true);
        expect(wrapper.text().includes("More")).toBe(true);
        expect(wrapper.find(Button).text().includes("Tweet")).toBe(true);
    });

    it("should render Notifications Count", () => {
        const mockState = {
            ...mockRootState,
            user: { ...mockRootState.user, data: { ...mockUser, notificationsCount: 100 } }
        };
        const { wrapper } = createSideMenuWrapper(mockState);

        expect(wrapper.find("#notificationsCount").exists()).toBeTruthy();
        expect(wrapper.find("#notificationsCount").text().includes("100")).toBe(true);
    });

    it("should render empty Home Notification", () => {
        const { wrapper } = createSideMenuWrapper(createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.find("#homeNotification").exists()).toBeFalsy();
    });

    it("should click open and render Popover items correctly", () => {
        const { wrapper } = createSideMenuWrapper();

        expect(wrapper.find(Popover).at(0).prop("open")).toBe(false);
        wrapper.find("#openPopup").simulate("click");

        expect(wrapper.find(Popover).at(0).prop("open")).toBe(true);
        expect(wrapper.find(Popover).at(0).text().includes("Newsletters")).toBe(true);
        expect(wrapper.find(Popover).at(0).text().includes("Twitter Ads")).toBe(true);
        expect(wrapper.find(Popover).at(0).text().includes("Analytics")).toBe(true);
        expect(wrapper.find(Popover).at(0).text().includes("Settings and privacy")).toBe(true);
        expect(wrapper.find(Popover).at(0).text().includes("Help Center")).toBe(true);
        expect(wrapper.find(Popover).at(0).text().includes("Display")).toBe(true);
        expect(wrapper.find(Popover).at(0).text().includes("Keyboard shortcuts")).toBe(true);
    });

    it("should click close Popup", () => {
        const { wrapper } = createSideMenuWrapper();

        expect(wrapper.find(Popover).at(0).prop("open")).toBe(false);
        wrapper.find("#openPopup").simulate("click");

        expect(wrapper.find(Popover).at(0).prop("open")).toBe(true);
        wrapper.find(Popover).at(0).find("#closePopup").at(0).simulate("click");

        expect(wrapper.find(Popover).at(0).prop("open")).toBe(false);
    });

    it("should click Open Add Tweet Modal and close", () => {
        const { wrapper } = createSideMenuWrapper();

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(true);
        wrapper.find(AddTweetModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
    });

    it("should click Open Display Modal and close", () => {
        const { wrapper } = createSideMenuWrapper();

        expect(wrapper.find(DisplayModal).prop("visible")).toBe(false);

        wrapper.find("#openPopup").simulate("click");
        wrapper.find("#openDisplayModal").at(0).simulate("click");

        expect(wrapper.find(DisplayModal).prop("visible")).toBe(true);
        wrapper.find(DisplayModal).find(".MuiBackdrop-root").simulate("click");

        expect(wrapper.find(DisplayModal).prop("visible")).toBe(false);
    });

    it("should click Open Follower Requests Modal and close", () => {
        const mockState = {
            ...mockRootState,
            user: { ...mockRootState.user, data: { ...mockUser, isPrivateProfile: true } }
        };
        const { wrapper } = createSideMenuWrapper(mockState);

        expect(wrapper.find(FollowerRequestsModal).prop("visible")).toBe(false);

        wrapper.find("#openPopup").simulate("click");
        wrapper.find("#openFollowerRequestsModal").at(0).simulate("click");

        expect(wrapper.find(FollowerRequestsModal).prop("visible")).toBe(true);
        wrapper.find(FollowerRequestsModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(FollowerRequestsModal).prop("visible")).toBe(false);
    });

    it("should render HomeIconFilled", () => {
        testSelectedIcon(HOME, "#homeIconFilled");
    });

    it("should render ExploreIconFilled", () => {
        testSelectedIcon(SEARCH, "#exploreIconFilled");
    });

    it("should render NotificationsIconFilled", () => {
        testSelectedIcon(NOTIFICATIONS, "#notificationsIconFilled");
    });

    it("should render MessagesIconFilled", () => {
        testSelectedIcon(MESSAGES, "#messagesIconFilled");
    });

    it("should render BookmarksIconFilled", () => {
        testSelectedIcon(BOOKMARKS, "#bookmarksIconFilled");
    });

    it("should render ListsIconFilled", () => {
        testSelectedIcon(LISTS, "#listsIconFilled");
    });

    it("should render ProfileIconFilled", () => {
        testSelectedIcon(`${PROFILE}/2`, "#profileIconFilled");
    });

    it("should click to Tweet Icon Link", () => {
        testClickToNavLink(HOME, 0);
    });

    it("should click to Home Link", () => {
        testClickToNavLink(HOME, 1);
    });

    it("should click to Explore Link", () => {
        testClickToNavLink(SEARCH, 2);
    });

    it("should click to Notifications Link", () => {
        testClickToNavLink(NOTIFICATIONS, 3);
    });

    it("should click to Messages Link", () => {
        testClickToNavLink(MESSAGES, 4);
    });

    it("should click to Bookmarks Link", () => {
        testClickToNavLink(BOOKMARKS, 5);
    });

    it("should click to Lists Link", () => {
        testClickToNavLink(LISTS, 6);
    });

    it("should click to Profile Link", () => {
        testClickToNavLink(`${PROFILE}/2`, 7);
    });

    const testSelectedIcon = (pathname: string, iconId: string): void => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: pathname,
            hash: "",
            search: "",
            state: undefined
        });
        const { wrapper } = createSideMenuWrapper();

        expect(wrapper.find(iconId).exists()).toBeTruthy();
    };

    const testClickToNavLink = (pathname: string, linkIndex: number): void => {
        const mockLocation = { hash: "", pathname: pathname, search: "", state: null };
        jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
        const { wrapper, pushSpy } = createSideMenuWrapper();

        wrapper.find(NavLink).at(linkIndex).simulate("click", { button: 0 });

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(mockLocation);
    };

    const createSideMenuWrapper = (mockState = mockRootState) => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const mockStore = configureStore([]);
        const store = mockStore(mockState);
        const theme = createTheme({
            props: { MuiWithWidth: { initialWidth: "xl" } }
        });

        const wrapper = mount(
            <Router history={history}>
                <Provider store={store}>
                    <MuiThemeProvider theme={theme}>
                        <SideMenu changeBackgroundColor={jest.fn()} changeColorScheme={jest.fn()} />
                    </MuiThemeProvider>
                </Provider>
            </Router>
        );

        return { wrapper, pushSpy };
    };
});
