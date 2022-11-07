import React from "react";
import {Button, Dialog} from "@material-ui/core";

import ProfileUpdatedModal from "../ProfileUpdatedModal";
import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";

describe("ProfileUpdatedModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render empty ProfileUpdatedModal", () => {
        const wrapper = mountWithStore(
            <ProfileUpdatedModal
                open={false}
                onClose={jest.fn()}
                onSubmit={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(Dialog).prop("open")).toBe(false);
    });

    it("should render correctly and submit", () => {
        const mockOnSubmit = jest.fn();
        const wrapper = mountWithStore(
            <ProfileUpdatedModal
                open={true}
                onClose={jest.fn()}
                onSubmit={mockOnSubmit}
            />, mockRootState);
        
        wrapper.find(Button).simulate("click");

        expect(mockOnSubmit).toHaveBeenCalled();
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("Your profile is updated")).toBe(true);
        expect(wrapper.find(Button).text().includes("See profile")).toBe(true);
    });
});
