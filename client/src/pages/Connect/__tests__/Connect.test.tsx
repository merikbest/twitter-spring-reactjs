import React from "react";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import Spinner from "../../../components/Spinner/Spinner";
import Connect from "../Connect";
import {LoadingStatus} from "../../../store/types";
import UsersItem from "../../../components/UsersItem/UsersItem";
import {UsersActionsType} from "../../../store/ducks/users/contracts/actionTypes";

window.scrollTo = jest.fn();

describe("Connect", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());
    
    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Connect/>, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).toHaveBeenCalledWith({type: UsersActionsType.FETCH_USERS});
    });

    it("should render list of UsersItem", () => {
        const wrapper = mountWithStore(<Connect/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes("Suggested for you")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(mockDispatchFn).toHaveBeenCalledWith({type: UsersActionsType.FETCH_USERS});
    });
});
