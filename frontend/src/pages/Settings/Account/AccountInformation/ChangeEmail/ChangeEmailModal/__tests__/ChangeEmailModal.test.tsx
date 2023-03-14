import React from "react";
import { Button, Dialog } from "@material-ui/core";

import ChangeEmailModal from "../ChangeEmailModal";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../../util/test-utils/test-helper";
import { ChangeInfoTextField } from "../../../../../ChangeInfoTextField/ChangeInfoTextField";
import { LoadingStatus } from "../../../../../../../types/common";

describe("ChangeEmailModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty ChangeEmailModal window correctly", () => {
        const wrapper = mountWithStore(<ChangeEmailModal visible={false} onClose={jest.fn()} />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render ChangeEmailModal window correctly", (done) => {
        const wrapper = mountWithStore(<ChangeEmailModal visible={true} onClose={jest.fn()} />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("Change email")).toBe(true);
        expect(wrapper.text().includes(`Your current email is ${mockStore.user.data?.email}.`)).toBe(true);

        wrapper.find(ChangeInfoTextField).at(0).find("input").simulate("change", { target: { value: "test@test.test" } });

        setImmediate(() => {
            wrapper.update();
            done();
            wrapper.find(Button).simulate("submit");
            expect(wrapper.find(Button).text().includes("Cancel")).toBe(true);
        });
    });

    it("should render ChangeEmailModal input error", (done) => {
        const wrapper = mountWithStore(<ChangeEmailModal visible={true} onClose={jest.fn()} />, mockStore);

        wrapper.find(ChangeInfoTextField).at(0).find("input").simulate("change", { target: { value: "test@test" } });

        setImmediate(() => {
            wrapper.update();
            done();
            wrapper.find(Button).simulate("submit");
            expect(wrapper.find(ChangeInfoTextField).prop("helperText")).toBe("Invalid mail");
        });
    });
});
