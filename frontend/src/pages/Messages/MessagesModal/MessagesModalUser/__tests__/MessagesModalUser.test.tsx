import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../../util/testHelper";
import MessagesModalUser from "../MessagesModalUser";
import {mockUsers} from "../../../../../util/mockData/mockData";
import {UserResponse} from "../../../../../store/types/user";
import {DEFAULT_PROFILE_IMG} from "../../../../../util/url";
import {LoadingStatus} from "../../../../../store/types/common";

describe("MessagesModalUser", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockUser = mockUsers[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<MessagesModalUser user={mockUser}/>, mockStore);
        
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar.src);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.find("#lockIcon").at(0).exists()).toBeFalsy();
    });

    it("should render private user profile", () => {
        const mockPrivateUserStore = {
            ...mockStore, 
            isPrivateProfile: true,
            isMutedDirectMessages: true,
            avatar: undefined
        } as unknown as UserResponse;
        const wrapper = mountWithStore(<MessagesModalUser user={mockPrivateUserStore}/>, mockStore);

        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
        expect(wrapper.find("#lockIcon").at(0).exists()).toBeTruthy();
    });
});
