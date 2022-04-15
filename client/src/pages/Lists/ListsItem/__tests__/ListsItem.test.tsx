import React from "react";
import {Avatar, Button, IconButton} from "@material-ui/core";

import ListsItem from "../ListsItem";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import {mockLists, mockUserFullList} from "../../../../util/mockData/mockData";
import {ListsActionType} from "../../../../store/ducks/lists/contracts/actionTypes";
import {ListResponse} from "../../../../store/types/lists";
import HoverAction from "../../../../components/HoverAction/HoverAction";
import PopperListWindow from "../../PopperListWindow/PopperListWindow";

describe("ListsItem", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockList = mockLists[0];
    const mockMyList = mockLists[2];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render ListsItem correctly", () => {
        const wrapper = mountWithStore(<ListsItem item={mockList} listIndex={2} isMyList={false}/>, mockStore);
        
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockList.altWallpaper);
        expect(wrapper.text().includes(mockList.name)).toBe(true);
        expect(wrapper.text().includes(mockList.description)).toBe(true);
        expect(wrapper.find(Avatar).at(1).prop("src")).toEqual(mockList.listOwner.avatar.src);
        expect(wrapper.text().includes(mockList.listOwner.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockList.listOwner.username}`)).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Follow")).toBe(true);
    });

    it("should click follow ListsItem", () => {
        const wrapper = mountWithStore(<ListsItem item={mockList} listIndex={2} isMyList={false}/>, mockStore);
        wrapper.find(Button).at(0).simulate("click");
        
        expect(mockDispatchFn).nthCalledWith(1, {payload: 2, type: ListsActionType.FOLLOW_LIST});
    });

    it("should click unfollow ListsItem", () => {
        const mockFollowList = {...mockList, isFollower: true};
        const wrapper = mountWithStore(<ListsItem item={mockFollowList} listIndex={2} isMyList={false}/>, mockStore);
        const mockButton = wrapper.find(Button).at(0);
        
        mockButton.simulate("mouseover");
        expect(mockButton.text().includes("Unfollow")).toBe(true);
        
        mockButton.simulate("mouseleave");
        expect(mockButton.text().includes("Following")).toBe(true);
        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {payload: 2, type: ListsActionType.UNFOLLOW_LIST});
    });

    it("should click unpin ListsItem", () => {
        const wrapper = mountWithStore(<ListsItem item={mockMyList} listIndex={2} isMyList={true}/>, mockStore);
        wrapper.find(IconButton).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {payload: 3, type: ListsActionType.UNPIN_LIST});
    });

    it("should click pin ListsItem", () => {
        const mockPinList = {...mockMyList, pinnedDate: null} as unknown as ListResponse;
        const wrapper = mountWithStore(<ListsItem item={mockPinList} listIndex={2} isMyList={true}/>, mockStore);
        wrapper.find(IconButton).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {payload: 3, type: ListsActionType.PIN_LIST});
    });

    it("should hover list info and render Popper List Window", () => {
        const mockListsStore = {...mockStore, listDetail: {...mockStore.listDetail, item: mockUserFullList}}
        jest.useFakeTimers();
        const wrapper = mountWithStore(<ListsItem item={mockList} listIndex={2} isMyList={false}/>, mockListsStore);
        wrapper.find("#listInfoWrapper").at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        
        expect(wrapper.find(PopperListWindow).exists()).toBeTruthy();
        expect(wrapper.find(PopperListWindow).at(0).prop("visible")).toBe(true);
    });

    it("should hover pin icon and render Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<ListsItem item={mockList} listIndex={2} isMyList={true}/>, mockStore);
        wrapper.find(IconButton).at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(0).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(0).prop("actionText")).toBe("Pin");
    });
});
