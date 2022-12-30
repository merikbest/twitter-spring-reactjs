import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../../util/testHelper";
import {mockUsers} from "../../../../../util/mockData/mockData";
import {DEFAULT_PROFILE_IMG} from "../../../../../util/url";
import DirectUserItem from "../DirectUserItem";
import {LoadingStatus} from "../../../../../store/types/common";

describe("DirectUserItem", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockUser = mockUsers[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <DirectUserItem
                user={mockUser}
                userFromChat
                myProfileId={2}
                selected={false}
                handleListItemClick={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar.src);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUser.username)).toBe(true);
        expect(wrapper.find("#checkIcon").exists()).toBeFalsy();
        expect(wrapper.find("#lockIcon").exists()).toBeFalsy();
    });

    it("should render selected and private user", () => {
        const wrapper = mountWithStore(
            <DirectUserItem
                user={{
                    ...mockUser,
                    avatar: {id: 1, src: ""},
                    isPrivateProfile: true
                }}
                userFromChat
                myProfileId={2}
                selected
                handleListItemClick={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUser.username)).toBe(true);
        expect(wrapper.find("#checkIcon").exists()).toBeTruthy();
        expect(wrapper.find("#lockIcon").exists()).toBeTruthy();
    });
});
