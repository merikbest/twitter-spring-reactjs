import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { mockUsers } from "../../../../../util/test-utils/mock-test-data";
import { DEFAULT_PROFILE_IMG } from "../../../../../constants/url-constants";
import DirectUserItem from "../DirectUserItem";
import { LoadingStatus } from "../../../../../types/common";

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

        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUser.username)).toBe(true);
        expect(wrapper.find("#checkIcon").exists()).toBeFalsy();
        expect(wrapper.find("#lockIcon").exists()).toBeFalsy();
    });

    it("should render selected and private user", () => {
        const wrapper = mountWithStore(
            <DirectUserItem
                user={{ ...mockUser, avatar: null, isPrivateProfile: true }}
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
