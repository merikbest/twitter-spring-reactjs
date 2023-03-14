import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import UnfollowModal from "../../../UnfollowModal/UnfollowModal";
import UnfollowButton from "../UnfollowButton";

describe("UnfollowButton", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click process Follow Request", () => {
        const wrapper = mountWithStore(
            <UnfollowButton
                userId={11}
                fullName={"test_name"}
                size={"medium"}
                isPrivateProfile
                isOpenUnfollowModal={false}
            />, mockState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
            payload: 11,
            type: UserActionsType.PROCESS_FOLLOW_REQUEST
        });
    });

    it("should click Unfollow user", () => {
        const wrapper = mountWithStore(
            <UnfollowButton
                userId={11}
                fullName={"test_name"}
                size={"medium"}
                isPrivateProfile={false}
                isOpenUnfollowModal={false}
            />, mockState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
            payload: { userId: 11 },
            type: UserActionsType.UNFOLLOW_USER
        });
    });

    it("should hover UnfollowButton", () => {
        const wrapper = mountWithStore(
            <UnfollowButton
                userId={11}
                fullName={"test_name"}
                size={"medium"}
                isPrivateProfile
                isOpenUnfollowModal
            />, mockState);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unfollow")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
    });

    it("should click and open/close UnfollowModal", () => {
        const wrapper = mountWithStore(
            <UnfollowButton
                userId={11}
                fullName={"test_name"}
                size={"medium"}
                isPrivateProfile
                isOpenUnfollowModal
            />, mockState);
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(true);
        wrapper.find(UnfollowModal).find(Button).at(0).simulate("click");
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(false);
    });
});
