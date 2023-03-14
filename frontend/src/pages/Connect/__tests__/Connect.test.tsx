import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import Spinner from "../../../components/Spinner/Spinner";
import Connect from "../Connect";
import UsersItem from "../../../components/UsersItem/UsersItem";
import { UsersActionsType } from "../../../store/ducks/users/contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

window.scrollTo = jest.fn();

describe("Connect", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Connect />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).toHaveBeenCalledWith({ payload: 0, type: UsersActionsType.FETCH_USERS });
    });

    it("should render list of UsersItem", () => {
        const wrapper = mountWithStore(<Connect />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes("Suggested for you")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).toHaveBeenCalledWith({ payload: 0, type: UsersActionsType.FETCH_USERS });
    });
});
