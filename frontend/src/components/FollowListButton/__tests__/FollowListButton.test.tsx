import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { ListsActionType } from "../../../store/ducks/lists/contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";
import FollowListButton from "../FollowListButton";

describe("FollowListButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click Unfollow List", () => {
        const wrapper = mountWithStore(<FollowListButton listId={1} isFollower />, mockRootState);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(Button).prop("variant")).toBe("contained");
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
        expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
            payload: 1,
            type: ListsActionType.UNFOLLOW_LIST
        });
    });

    it("should click Follow List", () => {
        const wrapper = mountWithStore(<FollowListButton listId={1} isFollower={false} />, mockRootState);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(Button).prop("variant")).toBe("outlined");
        expect(wrapper.find(Button).text().includes("Follow")).toBe(true);
        expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
            payload: 1,
            type: ListsActionType.FOLLOW_LIST
        });
    });

    it("should hover FollowListButton", () => {
        const wrapper = mountWithStore(<FollowListButton listId={1} isFollower />, mockRootState);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unfollow")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
    });
});
