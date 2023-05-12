import React from "react";
import { Dialog, IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../types/common";
import TaggedImageUsers from "../TaggedImageUsers";
import { mockUsers } from "../../../util/test-utils/mock-test-data";
import { TweetActionType } from "../../../store/ducks/tweet/contracts/actionTypes";
import CloseButton from "../../CloseButton/CloseButton";
import Spinner from "../../Spinner/Spinner";
import UsersItem from "../../UsersItem/UsersItem";

describe("TaggedImageUsers", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<TaggedImageUsers tweetId={1} taggedImageUsers={mockUsers} />,
            createMockRootState(LoadingStatus.LOADING));
        wrapper.find("#onClickGetTaggedImageUsers").at(0).simulate("click");
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should click open and close TaggedImageUsers", () => {
        const wrapper = mountWithStore(<TaggedImageUsers tweetId={1} taggedImageUsers={mockUsers} />, mockRootState);
        expect(wrapper.find(Dialog).prop("open")).toBe(false);
        wrapper.find("#onClickGetTaggedImageUsers").at(0).simulate("click");
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { tweetId: 1, pageNumber: 0 },
            type: TweetActionType.FETCH_TAGGED_IMAGE_USERS
        });
        wrapper.find(CloseButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, {
            type: TweetActionType.RESET_TAGGED_IMAGE_USERS_STATE
        });
    });
});
