import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {Button} from "@material-ui/core";
import {ReactWrapper} from "enzyme";

import ChangeYourPassword from "../ChangeYourPassword";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";
import {API_URL} from "../../../../../util/url";
import ActionSnackbar from "../../../../../components/ActionSnackbar/ActionSnackbar";

describe("ChangeYourPassword", () => {
    const mockPassword = "test_password";
    const mockNewPassword = "test_password123";
    const mockChangePasswordRequest = {
        currentPassword: mockPassword,
        password: mockNewPassword,
        password2: mockNewPassword
    };
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should change password and submit", (done) => {
        const mockAdapter = new MockAdapter(axios);
        const mockSuccessMessage = "Your password has been successfully updated.";
        const wrapper = mountWithStore(<ChangeYourPassword/>, mockStore);

        submitChangePasswordForm(wrapper);

        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(false);
        expect(wrapper.find(ChangeInfoTextField).at(0).prop("value")).toBe(mockPassword);
        expect(wrapper.find(ChangeInfoTextField).at(1).prop("value")).toBe(mockNewPassword);
        expect(wrapper.find(ChangeInfoTextField).at(2).prop("value")).toBe(mockNewPassword);

        mockAdapter.onPost(`${API_URL}/auth/reset/current`, mockChangePasswordRequest).reply(200, mockSuccessMessage);

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
            expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe(mockSuccessMessage);
            expect(wrapper.find(ChangeInfoTextField).at(0).prop("value")).toBe("");
            expect(wrapper.find(ChangeInfoTextField).at(1).prop("value")).toBe("");
            expect(wrapper.find(ChangeInfoTextField).at(2).prop("value")).toBe("");
        });
    });
    
    it("should return current password error message", (done) => {
        const mockAdapter = new MockAdapter(axios);
        const mockErrorMessage = "The password you entered was incorrect.";
        const wrapper = mountWithStore(<ChangeYourPassword/>, mockStore);

        submitChangePasswordForm(wrapper);

        mockAdapter.onPost(`${API_URL}/auth/reset/current`, mockChangePasswordRequest).reply(404, {currentPassword: mockErrorMessage});

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(ChangeInfoTextField).at(0).prop("error")).toBe(true);
            expect(wrapper.find(ChangeInfoTextField).at(0).prop("helperText")).toBe(mockErrorMessage);
        });
    });

    it("should return password do not match error message", (done) => {
        const mockAdapter = new MockAdapter(axios);
        const mockErrorMessage = "Passwords do not match.";
        const wrapper = mountWithStore(<ChangeYourPassword/>, mockStore);

        submitChangePasswordForm(wrapper);

        mockAdapter.onPost(`${API_URL}/auth/reset/current`, mockChangePasswordRequest).reply(400, {password: mockErrorMessage});

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(ChangeInfoTextField).at(1).prop("error")).toBe(true);
            expect(wrapper.find(ChangeInfoTextField).at(1).prop("helperText")).toBe(mockErrorMessage);
        });
    });

    it("should return password2 is empty error message", (done) => {
        const mockAdapter = new MockAdapter(axios);
        const mockErrorMessage = "Password confirmation cannot be empty.";
        const wrapper = mountWithStore(<ChangeYourPassword/>, mockStore);

        submitChangePasswordForm(wrapper);

        mockAdapter.onPost(`${API_URL}/auth/reset/current`, mockChangePasswordRequest).reply(400, {password2: mockErrorMessage});

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(ChangeInfoTextField).at(2).prop("error")).toBe(true);
            expect(wrapper.find(ChangeInfoTextField).at(2).prop("helperText")).toBe(mockErrorMessage);
        });
    });

    const submitChangePasswordForm = (wrapper: ReactWrapper<any, React.Component["state"], React.Component>): void => {
        wrapper.find(ChangeInfoTextField).at(0).find("input").simulate("change", {target: {value: mockPassword}});
        wrapper.find(ChangeInfoTextField).at(1).find("input").simulate("change", {target: {value: mockNewPassword}});
        wrapper.find(ChangeInfoTextField).at(2).find("input").simulate("change", {target: {value: mockNewPassword}});
        wrapper.find(Button).simulate("submit");
    };
});
