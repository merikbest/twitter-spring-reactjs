import React from "react";
import { Button, IconButton } from "@material-ui/core";
import routeData from "react-router";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import EditProfileButton from "../EditProfileButton";
import SetupProfileModal from "../SetupProfileModal/SetupProfileModal";
import ProfilePictureModal from "../SetupProfileModal/ProfilePictureModal/ProfilePictureModal";
import { mockUser } from "../../../../util/test-utils/mock-test-data";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import { PROFILE } from "../../../../constants/path-constants";

describe("EditProfileButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should open/close SetupProfileModal", () => {
        const wrapper = mountWithStore(<EditProfileButton />, mockRootState);
        expect(wrapper.text().includes("Setup profile")).toBe(true);
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(true);
        wrapper.find(SetupProfileModal).find(ProfilePictureModal).find(".MuiBackdrop-root").at(0).simulate("click");
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(false);
    });

    it("should open/close EditProfileModal", () => {
        const wrapper = mountWithStore(<EditProfileButton />, {
            ...mockRootState,
            user: { ...mockRootState.user, data: { ...mockUser, profileCustomized: true } }
        });
        expect(wrapper.text().includes("Edit profile")).toBe(true);
        expect(wrapper.find(EditProfileModal).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(EditProfileModal).prop("visible")).toBe(true);
        wrapper.find(EditProfileModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(EditProfileModal).prop("visible")).toBe(false);
    });

    it("should open SetupProfileModal", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: `${PROFILE}/2`, hash: "", search: "", state: { isRegistered: true }
        });
        const wrapper = mountWithStore(<EditProfileButton />, mockRootState);
        expect(wrapper.find(SetupProfileModal).prop("visible")).toBe(true);
    });
});
