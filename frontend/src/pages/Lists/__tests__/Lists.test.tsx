import React from "react";
import { Link } from "react-router-dom";
import routeData from "react-router";
import { ClickAwayListener, IconButton } from "@material-ui/core";

import Lists from "../Lists";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { ListsActionType } from "../../../store/ducks/lists/contracts/actionTypes";
import Spinner from "../../../components/Spinner/Spinner";
import {
    mockLists,
    mockPinnedLists,
    mockSimpleList,
    mockUser,
    mockUserLists
} from "../../../util/test-utils/mock-test-data";
import PinnedListsItem from "../PinnedLists/PinnedListsItem/PinnedListsItem";
import ListsItem from "../ListsItem/ListsItem";
import CreateListsModal from "../ListsHeader/CreateListsModal/CreateListsModal";
import CloseButton from "../../../components/CloseButton/CloseButton";
import HoverAction from "../../../components/HoverAction/HoverAction";
import { LISTS, LISTS_MEMBERSHIPS } from "../../../constants/path-constants";
import { LoadingStatus } from "../../../types/common";

window.scrollTo = jest.fn();

describe("Lists", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListsStore = {
        ...mockStore,
        lists: {
            ...mockStore.lists,
            lists: mockLists,
            userLists: mockUserLists,
            pinnedLists: mockPinnedLists,
            simpleLists: mockSimpleList
        }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: LISTS, hash: "", search: "", state: ""
        });
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Lists />, createMockRootState());

        expect(global.window.document.title).toBe("Lists / Twitter");
        expect(wrapper.find(Spinner).at(0).exists()).toBe(true);
        expect(wrapper.find(Spinner).at(1).exists()).toBe(true);
        expect(wrapper.find(Spinner).at(2).exists()).toBe(true);
        expect(wrapper.text().includes("Pinned Lists")).toBe(true);
        expect(wrapper.text().includes("Discover new Lists")).toBe(true);
        expect(wrapper.text().includes("Show more")).toBe(true);
        expect(wrapper.text().includes("Your Lists")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { type: ListsActionType.FETCH_LISTS });
        expect(mockDispatchFn).nthCalledWith(2, { type: ListsActionType.FETCH_USER_LISTS });
        expect(mockDispatchFn).nthCalledWith(3, { type: ListsActionType.FETCH_PINNED_LISTS });
    });

    it("should render Lists", () => {
        const wrapper = mountWithStore(<Lists />, mockListsStore);

        expect(wrapper.text().includes("Lists")).toBe(true);
        expect(wrapper.text().includes(`${mockUser.username}`)).toBe(true);
        expect(wrapper.find(PinnedListsItem).length).toEqual(1);
        expect(wrapper.find("#list").find(ListsItem).length).toEqual(3);
        expect(wrapper.find("#userLists").find(ListsItem).length).toEqual(1);
    });

    it("should render empty Pinned list message", () => {
        const wrapper = mountWithStore(<Lists />, {
            ...mockListsStore,
            lists: { ...mockListsStore.lists, pinnedLists: [] }
        });

        expect(wrapper.text().includes("Nothing to see here yet — pin your favorite Lists to access them quickly.")).toBe(true);
    });

    it("should open Create List Modal", () => {
        const wrapper = mountWithStore(<Lists />, mockListsStore);
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(false);
        wrapper.find(IconButton).at(1).simulate("click");

        expect(wrapper.find(CreateListsModal).exists()).toBe(true);
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(true);
    });

    it("should close Create List Modal", () => {
        const wrapper = mountWithStore(<Lists />, mockListsStore);
        wrapper.find(IconButton).at(1).simulate("click");
        wrapper.find(CreateListsModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(CreateListsModal).exists()).toBe(true);
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(false);
    });

    it("should open Popover", () => {
        const wrapper = mountWithStore(<Lists />, mockListsStore);
        wrapper.find(IconButton).at(2).simulate("click");

        expect(wrapper.find(Link).at(0).prop("to")).toBe(`${LISTS_MEMBERSHIPS}/${mockUser.id}`);
        expect(wrapper.text().includes("Lists you’re on")).toBe(true);
    });

    it("should click away Popover", () => {
        const wrapper = mountWithStore(<Lists />, mockListsStore);
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());

        expect(wrapper.find(ClickAwayListener).exists()).toBeTruthy();
    });

    it("should hover create list icon and render Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<Lists />, mockStore);
        wrapper.find(IconButton).at(1).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(1).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(1).prop("actionText")).toBe("Create");
    });

    it("should hover edit list icon and render Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<Lists />, mockStore);
        wrapper.find(IconButton).at(2).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(2).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(2).prop("actionText")).toBe("More");
    });

    it("should reset Lists State", () => {
        const wrapper = mountWithStore(<Lists />, mockListsStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(4, { type: ListsActionType.RESET_LISTS_STATE });
    });
});
