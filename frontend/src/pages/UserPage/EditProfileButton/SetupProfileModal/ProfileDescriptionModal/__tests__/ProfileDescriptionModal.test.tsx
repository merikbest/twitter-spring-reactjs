import React from "react";
import { Button, Dialog } from "@material-ui/core";

import ProfileDescriptionModal from "../ProfileDescriptionModal";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import ProfileDescriptionInput from "../ProfileDescriptionInput/ProfileDescriptionInput";
import { LoadingStatus } from "../../../../../../types/common";

describe("ProfileDescriptionModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render empty ProfileDescriptionModal", () => {
        const wrapper = mountWithStore(
            <ProfileDescriptionModal
                isOpen={false}
                onClose={jest.fn()}
                text={""}
                onChangeText={jest.fn()}
                onOpenProfileUpdatedModal={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(Dialog).prop("open")).toBe(false);
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <ProfileDescriptionModal
                isOpen={true}
                onClose={jest.fn()}
                text={""}
                onChangeText={jest.fn()}
                onOpenProfileUpdatedModal={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("Describe yourself")).toBe(true);
        expect(wrapper.text().includes("What makes you special? Don't think too hard, just have fun with it.")).toBe(true);
        expect(wrapper.find(Button).text().includes("Skip for now")).toBe(true);
    });

    it("should change input and submit", () => {
        const mockOnChangeText = jest.fn();
        const mockOnOpenProfileUpdatedModal = jest.fn();
        const mockText = "Test description";
        const wrapper = mountWithStore(
            <ProfileDescriptionModal
                isOpen={true}
                onClose={jest.fn()}
                text={mockText}
                onChangeText={mockOnChangeText}
                onOpenProfileUpdatedModal={mockOnOpenProfileUpdatedModal}
            />, mockRootState);

        wrapper.find(ProfileDescriptionInput).find("input").simulate("change", { target: { value: mockText } });
        wrapper.find(Button).simulate("click");

        expect(mockOnChangeText).toHaveBeenCalled();
        expect(mockOnOpenProfileUpdatedModal).toHaveBeenCalled();
        expect(wrapper.find(ProfileDescriptionInput).prop("value")).toBe(mockText);
        expect(wrapper.find(Button).text().includes("Next")).toBe(true);
    });
});
