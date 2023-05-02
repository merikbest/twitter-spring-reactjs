import React from "react";
import { Button, Dialog } from "@material-ui/core";
import { setImmediate } from "timers";

import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";
import AddDescriptionModal from "../AddDescriptionModal";

describe("AddDescriptionModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should click onSubmit", (done) => {
        const mockHandleChangeDescription = jest.fn();
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(
            <AddDescriptionModal
                visible={true}
                onClose={mockOnClose}
                imageSrc={"image"}
                handleChangeDescription={mockHandleChangeDescription}
            />, mockRootState);
        wrapper.find(Button).at(0).simulate("submit");
        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockOnClose).toHaveBeenCalled();
            expect(mockHandleChangeDescription).toHaveBeenCalled();
        });
    });

    it("should render empty AddDescriptionModal", () => {
        const wrapper = mountWithStore(
            <AddDescriptionModal
                visible={false}
                onClose={jest.fn()}
                imageSrc={"image"}
                handleChangeDescription={jest.fn()}
            />, mockRootState);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
