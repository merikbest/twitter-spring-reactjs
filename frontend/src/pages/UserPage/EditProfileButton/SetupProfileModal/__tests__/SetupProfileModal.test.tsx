import React, { useState } from "react";
import { Button } from "@material-ui/core";

import SetupProfileModal from "../SetupProfileModal";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import ProfilePictureModal from "../ProfilePictureModal/ProfilePictureModal";
import ProfileDescriptionModal from "../ProfileDescriptionModal/ProfileDescriptionModal";
import ProfileUpdatedModal from "../ProfileUpdatedModal/ProfileUpdatedModal";
import ProfileHeaderModal from "../ProfileHeaderModal/ProfileHeaderModal";
import { UserActionsType } from "../../../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../../../types/common";

describe("SetupProfileModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render ProfilePictureModal", () => {
        const wrapper = mountWithStore(<SetupProfileModal visible={true} onClose={jest.fn()} />, mockRootState);
        expect(wrapper.find(ProfilePictureModal).prop("isOpen")).toBe(true);
    });

    it("should render ProfileHeaderModal", () => {
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => [true, () => null])
            .mockImplementationOnce(() => [false, () => null])
            .mockImplementationOnce(() => [false, () => null]);
        const wrapper = mountWithStore(<SetupProfileModal visible={false} onClose={jest.fn()} />, mockRootState);
        expect(wrapper.find(ProfileHeaderModal).prop("isOpen")).toBe(true);
    });

    it("should render ProfileDescriptionModal", () => {
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => [false, () => null])
            .mockImplementationOnce(() => [true, () => null])
            .mockImplementationOnce(() => [false, () => null]);
        const wrapper = mountWithStore(<SetupProfileModal visible={false} onClose={jest.fn()} />, mockRootState);
        expect(wrapper.find(ProfileDescriptionModal).prop("isOpen")).toBe(true);
    });

    it("should render ProfileUpdatedModal", () => {
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => [false, () => null])
            .mockImplementationOnce(() => [false, () => null])
            .mockImplementationOnce(() => [true, () => null]);
        const wrapper = mountWithStore(<SetupProfileModal visible={false} onClose={jest.fn()} />, mockRootState);
        expect(wrapper.find(ProfileUpdatedModal).prop("isOpen")).toBe(true);
    });

    it("should click on submit", () => {
        const mockUser = mockRootState.user.data;
        const mockOnClose = jest.fn();
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => [true, () => null])
            .mockImplementationOnce(() => [true, () => null])
            .mockImplementationOnce(() => [true, () => null]);
        const wrapper = mountWithStore(<SetupProfileModal visible={true} onClose={mockOnClose} />, mockRootState);

        wrapper.find(ProfileUpdatedModal).find(Button).simulate("click");

        expect(mockOnClose).toHaveBeenCalled();
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {
                fullName: mockUser?.fullName,
                location: mockUser?.location,
                website: mockUser?.website,
                avatar: undefined,
                wallpaper: undefined,
                about: ""
            },
            type: UserActionsType.UPDATE_USER_DATA
        });
    });
});
