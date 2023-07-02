import React from "react";
import { createMemoryHistory } from "history";
import { Button, Dialog } from "@material-ui/core";
import { setImmediate } from "timers";

import SetPasswordModal from "../SetPasswordModal";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { RegistrationInputField } from "../../RegistrationInput/RegistrationInputField";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { RegistrationStep } from "../../../../types/auth";

describe("SetPasswordModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockRootStore = {
        ...mockStore,
        authentication: {
            ...mockStore.authentication,
            registrationStep: RegistrationStep.STEP_5,
            registrationInfo: { username: "test_username", email: "test@test.test", birthday: "Feb 31, 1901" }
        }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should CreateAccountModal and submit form", (done) => {
        const history = createMemoryHistory();
        const wrapper = mountWithStore(<SetPasswordModal />, mockRootStore, history);
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("You'll need a password")).toBe(true);
        expect(wrapper.text().includes("Make sure it’s 8 characters or more.")).toBe(true);
        expect(wrapper.find(Button).text().includes("Next")).toBe(true);
        wrapper.find(RegistrationInputField).find("input").simulate("change", { target: { value: "test_password" } });
        wrapper.find(Button).at(0).simulate("click");
        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: { email: "test@test.test", password: "test_password", history },
                type: UserActionsType.FETCH_SIGN_UP
            });
        });
    });

    it("should render password error", (done) => {
        const mockText = "Your password needs to be at least 8 characters. Please enter a longer one.";
        const wrapper = mountWithStore(<SetPasswordModal />, mockRootStore);
        wrapper.find(RegistrationInputField).find("input").simulate("change", { target: { value: "test" } });
        wrapper.find(Button).at(0).simulate("submit");
        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(RegistrationInputField).prop("helperText")).toBe(mockText);
            expect(wrapper.find(RegistrationInputField).prop("error")).toBe(true);
        });
    });
});
