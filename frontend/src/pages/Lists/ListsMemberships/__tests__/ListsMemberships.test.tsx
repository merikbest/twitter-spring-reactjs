import React from "react";
import ReactRouter from "react-router";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockUser, mockUserLists, mockUserProfile } from "../../../../util/test-utils/mock-test-data";
import ListsItem from "../../ListsItem/ListsItem";
import ListsMemberships from "../ListsMemberships";
import Spinner from "../../../../components/Spinner/Spinner";
import { ListsActionType } from "../../../../store/ducks/lists/contracts/actionTypes";
import { UserProfileActionsType } from "../../../../store/ducks/userProfile/contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

window.scrollTo = jest.fn();

describe("ListsMemberships", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "2" });
    });

    it("should render Loading spinner", () => {
        const wrapper = mountWithStore(<ListsMemberships />, createMockRootState());

        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(wrapper.text().includes("Lists you’re on")).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { payload: 2, type: UserProfileActionsType.FETCH_USER });
    });

    it("should render empty ListsMemberships", () => {
        const wrapper = mountWithStore(<ListsMemberships />, mockStore);

        expect(wrapper.text().includes("You haven’t been added to any Lists yet")).toBe(true);
        expect(wrapper.text().includes("When someone adds you to a List, it’ll show up here.")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(2, { payload: 2, type: ListsActionType.FETCH_USER_LISTS_BY_ID });
    });

    it("should render empty another user ListsMemberships", () => {
        const wrapper = mountWithStore(<ListsMemberships />, {
            ...mockStore,
            userProfile: {
                ...mockStore.userProfile,
                user: mockUserProfile
            }
        });

        expect(wrapper.text().includes("Lists")).toBe(true);
        expect(wrapper.text().includes(`@${mockUserProfile.username} hasn’t created any Lists`)).toBe(true);
        expect(wrapper.text().includes("When they do, they’ll show up here.")).toBe(true);
    });

    it("should render Lists Items", () => {
        const wrapper = mountWithStore(<ListsMemberships />, {
            ...mockStore,
            userProfile: {
                ...mockStore.userProfile,
                user: mockUserProfile
            },
            lists: {
                ...mockStore.lists,
                userLists: mockUserLists
            }
        });

        expect(wrapper.find(ListsItem).length).toEqual(1);
    });

    it("should unmount ListsMemberships", () => {
        const wrapper = mountWithStore(<ListsMemberships />, createMockRootState());
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(2, { type: ListsActionType.RESET_LISTS_STATE });
    });
});
