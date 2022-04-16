import React from "react";
import {Avatar, Button, IconButton} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import PopperListWindow from "../PopperListWindow";
import {mockUserFullList} from "../../../../util/mockData/mockData";
import MembersAndFollowersModal
    from "../../../FullList/EditListModal/MembersAndFollowersModal/MembersAndFollowersModal";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import {ListsActionType} from "../../../../store/ducks/lists/contracts/actionTypes";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";

describe("PopperListWindow", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListDetail = {...mockStore, listDetail: {...mockStore.listDetail, item: mockUserFullList}};
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PopperListWindow visible={true}/>, mockListDetail);

        expect(wrapper.text().includes(mockUserFullList.name)).toBe(true);
        expect(wrapper.text().includes(mockUserFullList.description)).toBe(true);
        expect(wrapper.text().includes(mockUserFullList.listOwner.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockUserFullList.listOwner.username}`)).toBe(true);
        expect(wrapper.text().includes(`${mockUserFullList.membersSize} Members`)).toBe(true);
        expect(wrapper.text().includes(`${mockUserFullList.followersSize} Followers`)).toBe(true);
        expect(wrapper.find(Button).text().includes("Follow")).toBe(true);
    });

    it("should component not exist", () => {
        const wrapper = mountWithStore(<PopperListWindow visible={false}/>, mockListDetail);

        expect(wrapper.find("#popperListWindow").exists()).toBeFalsy();
    });

    it("should open Members Modal Window and close", () => {
        const wrapper = mountWithStore(<PopperListWindow visible={true}/>, mockListDetail);
        wrapper.find("#openMembersModalWindow").simulate("click");

        expect(wrapper.find(MembersAndFollowersModal).exists()).toBeTruthy();
        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(true);
        expect(wrapper.find(MembersAndFollowersModal).prop("title")).toBe("List members");

        wrapper.find(MembersAndFollowersModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(false);
    });

    it("should open Followers Modal Window", () => {
        const wrapper = mountWithStore(<PopperListWindow visible={true}/>, mockListDetail);
        wrapper.find("#openFollowersModalWindow").simulate("click");

        expect(wrapper.find(MembersAndFollowersModal).exists()).toBeTruthy();
        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(true);
        expect(wrapper.find(MembersAndFollowersModal).prop("title")).toBe("List followers");
    });

    it("should click follow Lists", () => {
        const wrapper = mountWithStore(<PopperListWindow visible={true}/>, mockListDetail);
        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {payload: 1, type: ListsActionType.FOLLOW_LIST});
    });

    it("should click unfollow Lists", () => {
        const mockFollowList = {
            ...mockStore,
            listDetail: {...mockStore.listDetail, item: {...mockUserFullList, isFollower: true}}
        };
        const wrapper = mountWithStore(<PopperListWindow visible={true}/>, mockFollowList);
        const mockButton = wrapper.find(Button).at(0);

        mockButton.simulate("mouseover");
        expect(mockButton.text().includes("Unfollow")).toBe(true);

        mockButton.simulate("mouseleave");
        expect(mockButton.text().includes("Following")).toBe(true);
        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {payload: 1, type: ListsActionType.UNFOLLOW_LIST});
    });

    it("should render img wallpaper", () => {
        const mockFollowList = {
            ...mockStore,
            listDetail: {
                ...mockStore.listDetail,
                item: {
                    ...mockUserFullList,
                    isFollower: true,
                    wallpaper: {src: "testwallpaper"},
                    listOwner: {
                        ...mockUserFullList.listOwner,
                        avatar: {
                            ...mockUserFullList.listOwner.avatar,
                            src: null
                        },
                    }
                }
            }
        };
        const wrapper = mountWithStore(<PopperListWindow visible={true}/>, mockFollowList);

        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(DEFAULT_PROFILE_IMG);
        expect(wrapper.find("img").at(0).prop("src")).toBe("testwallpaper");
    });
    // |     100 |    79.02 |     100 |     100 | 32-35,66-119
});
