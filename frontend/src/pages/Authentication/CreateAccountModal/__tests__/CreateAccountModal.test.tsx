import React from "react";
import { Button, Dialog } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import CreateAccountModal from "../CreateAccountModal";
import { RegistrationInputField } from "../../RegistrationInput/RegistrationInputField";
import Spinner from "../../../../components/Spinner/Spinner";
import { LoadingStatus } from "../../../../types/common";
import { RegistrationStep } from "../../../../types/auth";
import { AuthenticationTypes } from "../../../../store/ducks/authentication/constants/actionTypes";

describe("CreateAccountModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockRegistrationData = { username: "test_username", email: "test@test.test", birthday: "Feb 31, 1901" };
    const mockRootStore = {
        ...mockStore,
        authentication: {
            ...mockStore.authentication,
            registrationStep: RegistrationStep.STEP_3,
            registrationInfo: mockRegistrationData
        }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should render empty CreateAccountModal", () => {
        const wrapper = mountWithStore(<CreateAccountModal />, mockStore);
        expect(wrapper.find(Dialog).prop("open")).toBe(false);
    });

    it("should render loading Spinner", () => {
        const mockRootStore = {
            ...mockStore,
            authentication: {
                ...mockStore.authentication,
                registrationStep: RegistrationStep.STEP_3,
                loadingState: LoadingStatus.LOADING
            }
        };
        const wrapper = mountWithStore(<CreateAccountModal />, mockRootStore);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly CreateAccountModal", () => {
        const wrapper = mountWithStore(<CreateAccountModal />, mockRootStore);
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("Step 3 of 5")).toBe(true);
        expect(wrapper.text().includes("Create your account")).toBe(true);
        expect(wrapper.find(RegistrationInputField).at(0).prop("value")).toBe("test_username");
        expect(wrapper.find(RegistrationInputField).at(1).prop("value")).toBe("test@test.test");
        expect(wrapper.find(RegistrationInputField).at(2).prop("value")).toBe("Feb 31, 1901");
        expect(wrapper.find(Button).text().includes("Sign up")).toBe(true);
    });

    it("should click on submit CreateAccountModal", () => {
        const wrapper = mountWithStore(<CreateAccountModal />, mockRootStore);
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: mockRegistrationData,
            type: AuthenticationTypes.FETCH_SEND_REGISTRATION_CODE
        });
    });
});
