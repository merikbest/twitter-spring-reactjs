import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { mockUserDetailResponse } from "../../../util/test-utils/mock-test-data";
import PopperUserWindow from "../PopperUserWindow";
import { PROFILE } from "../../../constants/path-constants";
import { UserActionsType } from "../../../store/ducks/user/contracts/actionTypes";
import FollowerGroup from "../../FollowerGroup/FollowerGroup";
import { LoadingStatus } from "../../../types/common";

describe("PopperUserWindow", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);
    const mockRootState = {
        ...mockState,
        userDetail: { ...mockState.userDetail, item: mockUserDetailResponse }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWrapper(mockRootState);

        expect(wrapper.find(Link).at(0).prop("to")).toBe(`${PROFILE}/${mockUserDetailResponse.id}`);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUserDetailResponse.avatar);
        expect(wrapper.find(Button).at(0).text().includes("Following")).toBe(true);
        expect(wrapper.find(Link).at(1).prop("to")).toBe(`${PROFILE}/${mockUserDetailResponse.id}`);
        expect(wrapper.text().includes(mockUserDetailResponse.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUserDetailResponse.username)).toBe(true);
        expect(wrapper.text().includes(`${mockUserDetailResponse.followingSize}Followers`)).toBe(true);
        expect(wrapper.text().includes(`${mockUserDetailResponse.followersSize}Following`)).toBe(true);
        expect(wrapper.find(FollowerGroup).exists()).toBeTruthy();
        expect(wrapper.text().includes("Not followed by anyone you’re following")).toBe(true);
    });

    it("should click handle Unfollow", () => {
        const wrapper = mountWrapper(mockRootState);

        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, { payload: { userId: 1 }, type: UserActionsType.UNFOLLOW_USER });
    });

    it("should click handle Unfollow private profile", () => {
        const wrapper = mountWrapper({
            ...mockState,
            userDetail: { ...mockState.userDetail, item: { ...mockUserDetailResponse, isPrivateProfile: true } }
        });

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(FollowerGroup).exists()).toBeFalsy();
        expect(wrapper.find("svg").prop("id")).toEqual("lockIcon");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 1, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });

    it("should click handle Follow", () => {
        const wrapper = mountWrapper({
            ...mockState,
            userDetail: { ...mockState.userDetail, item: { ...mockUserDetailResponse, isFollower: false } }
        });

        expect(wrapper.find(Button).at(0).text().includes("Follow")).toBe(true);
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { userId: 1 }, type: UserActionsType.FOLLOW_USER });
    });

    it("should click handle Follow private profile", () => {
        const wrapper = mountWrapper({
            ...mockState,
            userDetail: {
                ...mockState.userDetail,
                item: { ...mockUserDetailResponse, isFollower: false, isPrivateProfile: true }
            }
        });

        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 1, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });

    it("should click cancel Follow", () => {
        const wrapper = mountWrapper({
            ...mockState,
            userDetail: {
                ...mockState.userDetail,
                item: { ...mockUserDetailResponse, isFollower: false, isWaitingForApprove: true }
            }
        });

        expect(wrapper.find(Button).at(0).text().includes("Pending")).toBe(true);
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 1, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });

    it("should click on Block User", () => {
        const wrapper = mountWrapper({
            ...mockState,
            userDetail: {
                ...mockState.userDetail,
                item: { ...mockUserDetailResponse, isFollower: false, isUserBlocked: true }
            }
        });

        expect(wrapper.find(Button).at(0).text().includes("Blocked")).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 1 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
    });

    it("should render empty PopperUserWindow", () => {
        const wrapper = mountWithStore(
            <PopperUserWindow
                visible={false}
                isTweetComponent={true}
                isTweetImageModal={false}
            />, mockState);

        expect(wrapper.find("div").exists()).toBeFalsy();
    });

    it("should mouse over and leave Blocked button", () => {
        const wrapper = mountWrapper({
            ...mockState,
            userDetail: {
                ...mockState.userDetail,
                item: { ...mockUserDetailResponse, isFollower: false, isUserBlocked: true }
            }
        });
        testSimulateHoverButton(wrapper, "Blocked", "Unblock");
    });

    it("should mouse over and leave Pending button", () => {
        const wrapper = mountWrapper({
            ...mockState,
            userDetail: {
                ...mockState.userDetail,
                item: { ...mockUserDetailResponse, isFollower: false, isWaitingForApprove: true }
            }
        });
        testSimulateHoverButton(wrapper, "Pending", "Cancel");
    });

    it("should mouse over and leave Following button", () => {
        const wrapper = mountWrapper(mockRootState);
        testSimulateHoverButton(wrapper, "Following", "Unfollow");
    });

    const testSimulateHoverButton = (wrapper: any, mouseleaveText: string, mouseOverText: string): void => {
        expect(wrapper.find(Button).at(0).text().includes(mouseleaveText)).toBe(true);
        wrapper.find(Button).at(0).simulate("mouseover");
        expect(wrapper.find(Button).at(0).text().includes(mouseOverText)).toBe(true);
        wrapper.find(Button).at(0).simulate("mouseleave");
        expect(wrapper.find(Button).at(0).text().includes(mouseleaveText)).toBe(true);
    };

    const mountWrapper = (mockState: any) => {
        return mountWithStore(
            <PopperUserWindow
                visible={true}
                isTweetComponent={true}
                isTweetImageModal={false}
            />, mockState);
    };
});
