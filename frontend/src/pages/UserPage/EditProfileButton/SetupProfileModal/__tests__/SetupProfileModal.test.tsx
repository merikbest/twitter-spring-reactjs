import React, { useState } from "react";

import SetupProfileModal from "../SetupProfileModal";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import ProfilePictureModal from "../ProfilePictureModal/ProfilePictureModal";
import ProfileHeaderModal from "../ProfileHeaderModal/ProfileHeaderModal";
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
});
