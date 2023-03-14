import React from "react";
import { createMemoryHistory } from "history";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import UsersItem from "../../UsersItem/UsersItem";
import Spinner from "../../Spinner/Spinner";
import { UsersActionsType } from "../../../store/ducks/users/contracts/actionTypes";
import { HOME_CONNECT } from "../../../constants/path-constants";
import Users from "../Users";
import { LoadingStatus } from "../../../types/common";

describe("Users", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Users />, createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Users />, mockRootState);
        expect(wrapper.text().includes("Who to follow")).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(wrapper.text().includes("Show more")).toBe(true);
    });

    it("should click connect", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<Users />, mockRootState, history);
        wrapper.find("#clickToConnect").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: UsersActionsType.RESET_USERS_STATE });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(HOME_CONNECT);
    });
});
