import React from "react";
import {Button, Dialog} from "@material-ui/core";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import CreateAccountModal from "../CreateAccountModal";
import {RegistrationInputField} from "../../RegistrationInput/RegistrationInputField";
import Spinner from "../../../../components/Spinner/Spinner";
import {API_URL} from "../../../../util/url";

describe("CreateAccountModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockRegistrationData = {username: "test_username", email: "test@test.test", birthday: "Feb 31, 1901"};
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty CreateAccountModal", () => {
        const wrapper = mountWithStore(
            <CreateAccountModal
                open={false}
                onClose={jest.fn()}
                registrationInfo={mockRegistrationData}
                onOpenEmailVerification={jest.fn()}
            />, mockStore);

        expect(wrapper.find(Dialog).prop("open")).toBe(false);
    });

    it("should render correctly CreateAccountModal", () => {
        const wrapper = mountWithStore(
            <CreateAccountModal
                open={true}
                onClose={jest.fn()}
                registrationInfo={mockRegistrationData}
                onOpenEmailVerification={jest.fn()}
            />, mockStore);

        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("Step 3 of 5")).toBe(true);
        expect(wrapper.text().includes("Create your account")).toBe(true);
        expect(wrapper.find(RegistrationInputField).at(0).prop("value")).toBe("test_username");
        expect(wrapper.find(RegistrationInputField).at(1).prop("value")).toBe("test@test.test");
        expect(wrapper.find(RegistrationInputField).at(2).prop("value")).toBe("Feb 31, 1901");
        expect(wrapper.find(Button).text().includes("Sign up")).toBe(true);
    });

    it("should click on submit CreateAccountModal", (done) => {
        const mock = new MockAdapter(axios);
        const mockOnOpenEmailVerification = jest.fn();
        const wrapper = mountWithStore(
            <CreateAccountModal
                open={true}
                onClose={jest.fn()}
                registrationInfo={mockRegistrationData}
                onOpenEmailVerification={mockOnOpenEmailVerification}
            />, mockStore);

        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(Spinner).exists()).toBe(true);
        mock.onPost(`${API_URL}/auth/registration/code`, mockRegistrationData).reply(200);
        
        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(Spinner).exists()).toBe(false);
            expect(mockOnOpenEmailVerification).toHaveBeenCalled();
            expect(mockOnOpenEmailVerification).toHaveBeenCalledWith(true);
        });
    });

    it("should click on submit CreateAccountModal and render error", (done) => {
        const mock = new MockAdapter(axios);
        const wrapper = mountWithStore(
            <CreateAccountModal
                open={true}
                onClose={jest.fn()}
                registrationInfo={mockRegistrationData}
                onOpenEmailVerification={jest.fn()}
            />, mockStore);

        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(Spinner).exists()).toBe(true);
        mock.onPost(`${API_URL}/auth/registration/code`, mockRegistrationData).reply(400);

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(Spinner).exists()).toBe(false);
        });
    });
});
