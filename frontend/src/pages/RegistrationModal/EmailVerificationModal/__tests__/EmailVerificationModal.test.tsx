import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Button, Dialog } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import EmailVerificationModal from "../EmailVerificationModal";
import { RegistrationInputField } from "../../RegistrationInput/RegistrationInputField";
import { API_AUTH_REGISTRATION_ACTIVATE } from "../../../../constants/endpoint-constants";
import { LoadingStatus } from "../../../../types/common";

describe("EmailVerificationModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockEmail = "test@test.test";

    it("should click and render correctly", (done) => {
        const mockAdapter = new MockAdapter(axios);
        const mockOnOpenSetPassword = jest.fn();
        const wrapper = mountWithStore(
            <EmailVerificationModal
                email={mockEmail}
                open={true}
                onClose={jest.fn()}
                onOpenSetPassword={mockOnOpenSetPassword}
            />, mockStore);

        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes(`Enter it below to verify ${mockEmail}.`)).toBe(true);
        expect(wrapper.find(Button).text().includes("Next")).toBe(true);

        wrapper.find(RegistrationInputField).find("input").simulate("change", { target: { value: "test" } });
        wrapper.find(Button).simulate("click");
        mockAdapter.onGet(`${API_AUTH_REGISTRATION_ACTIVATE}/test`).reply(200);

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockOnOpenSetPassword).toHaveBeenCalled();
            expect(mockOnOpenSetPassword).toHaveBeenCalledWith(true);
        });
    });

    it("should click and render error", (done) => {
        const mockAdapter = new MockAdapter(axios);
        const wrapper = mountWithStore(
            <EmailVerificationModal
                email={mockEmail}
                open={true}
                onClose={jest.fn()}
                onOpenSetPassword={jest.fn()}
            />, mockStore);

        wrapper.find(RegistrationInputField).find("input").simulate("change", { target: { value: "test" } });
        wrapper.find(Button).simulate("click");
        mockAdapter.onGet(`${API_AUTH_REGISTRATION_ACTIVATE}/test`).reply(400, "Test error");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(RegistrationInputField).prop("helperText")).toBe("Test error");
            expect(wrapper.find(RegistrationInputField).prop("error")).toBe(true);
        });
    });
});