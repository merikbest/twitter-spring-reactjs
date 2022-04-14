import React from "react";
import {Avatar, Button} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import ListsItem from "../ListsItem";
import {mockLists} from "../../../../util/mockData/mockData";
import {wallpapers} from "../../../../util/wallpapers";
import {ListsActionType} from "../../../../store/ducks/lists/contracts/actionTypes";

describe("ListsItem", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockList = mockLists[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render ListsItem correctly", () => {
        const wrapper = mountWithStore(<ListsItem item={mockLists[0]} listIndex={2} isMyList={false}/>, mockStore);
        
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockList.altWallpaper);
        expect(wrapper.text().includes(mockList.name)).toBe(true);
        expect(wrapper.text().includes(mockList.description)).toBe(true);
        expect(wrapper.find(Avatar).at(1).prop("src")).toEqual(mockList.listOwner.avatar.src);
        expect(wrapper.text().includes(mockList.listOwner.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockList.listOwner.username}`)).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Follow")).toBe(true);
    });

    it("should click follow ListsItem", () => {
        const wrapper = mountWithStore(<ListsItem item={mockLists[0]} listIndex={2} isMyList={false}/>, mockStore);
        wrapper.find(Button).at(0).simulate("click");
        
        expect(mockDispatchFn).nthCalledWith(1, {payload: 2, type: ListsActionType.FOLLOW_LIST});
    });
    // |   67.92 |    40.31 |      10 |   66.66 | 45-51,56-62,77-145
    // |   77.35 |    44.96 |      30 |   76.47 | 49,56-62,77-135
});
