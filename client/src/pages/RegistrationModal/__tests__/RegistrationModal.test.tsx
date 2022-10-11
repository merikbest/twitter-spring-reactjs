import React from "react";
import {Button, Dialog} from "@material-ui/core";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import RegistrationModal from "../RegistrationModal";
import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import RegistrationInput from "../RegistrationInput/RegistrationInput";
import {FilledSelect} from "../../../components/FilledSelect/FilledSelect";
import {API_AUTH_REGISTRATION_CHECK} from "../../../util/endpoints";

describe("RegistrationModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render empty RegistrationModal", () => {
        const wrapper = mountWithStore(
            <RegistrationModal
                open={false}
                onClose={jest.fn()}
                onOpenCustomize={jest.fn()}
                onChangeRegistrationInfo={jest.fn()}
            />, mockStore);

        expect(wrapper.find(Dialog).prop("open")).toBe(false);
    });

    it("should render correctly RegistrationModal", () => {
        const wrapper = mountWithStore(
            <RegistrationModal
                open={true}
                onClose={jest.fn()}
                onOpenCustomize={jest.fn()}
                onChangeRegistrationInfo={jest.fn()}
            />, mockStore);

        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("Create your account")).toBe(true);
        expect(wrapper.text().includes("Use phone instead")).toBe(true);
        expect(wrapper.text().includes("Date of birth")).toBe(true);
        expect(wrapper.text().includes("Month")).toBe(true);
        expect(wrapper.text().includes("Day")).toBe(true);
        expect(wrapper.text().includes("Year")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Next")).toBe(true);
    });

    it("should change inputs correctly and submit form", (done) => {
        const {
            mockRegistrationData,
            mockOnOpenCustomize,
            mockOnChangeRegistrationInfo,
            mock,
            wrapper
        } = initializeTest();

        wrapper.find(Button).at(0).simulate("submit");
        mock.onPost(API_AUTH_REGISTRATION_CHECK, mockRegistrationData).reply(200);

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockOnOpenCustomize).toHaveBeenCalled();
            expect(mockOnOpenCustomize).toHaveBeenCalledWith(true);
            expect(mockOnChangeRegistrationInfo).toHaveBeenCalled();
            expect(mockOnChangeRegistrationInfo).toHaveBeenCalledWith(mockRegistrationData);
        });
    });

    it("should return error on submit form", (done) => {
        const mockError = {
            username: "Please enter a valid name.",
            email: "Please enter a valid email address."
        };
        const {mockRegistrationData, mock, wrapper} = initializeTest();

        wrapper.find(Button).at(0).simulate("submit");
        mock.onPost(API_AUTH_REGISTRATION_CHECK, mockRegistrationData).reply(400, mockError);

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(RegistrationInput).at(0).prop("helperText")).toBe(mockError.username);
            expect(wrapper.find(RegistrationInput).at(0).prop("error")).toBe(true);
            expect(wrapper.find(RegistrationInput).at(1).prop("helperText")).toBe(mockError.email);
            expect(wrapper.find(RegistrationInput).at(1).prop("error")).toBe(true);
        });
    });

    const initializeTest = () => {
        const mockUsername = "test_username";
        const mockEmail = "test@test.test";
        const mockRegistrationData = {username: mockUsername, email: mockEmail, birthday: "Feb 31, 1901"};
        const mockOnOpenCustomize = jest.fn();
        const mockOnChangeRegistrationInfo = jest.fn();

        const mock = new MockAdapter(axios);
        const wrapper = mountWithStore(
            <RegistrationModal
                open={true}
                onClose={jest.fn()}
                onOpenCustomize={mockOnOpenCustomize}
                onChangeRegistrationInfo={mockOnChangeRegistrationInfo}
            />, mockStore);

        wrapper.find(RegistrationInput).at(0).find("input").simulate("change",
            {target: {value: mockUsername}});
        wrapper.find(RegistrationInput).at(1).find("input").simulate("change",
            {target: {value: mockEmail}});
        wrapper.find(FilledSelect).at(0).find("select").simulate("change",
            {target: {value: "Feb"}});
        wrapper.find(FilledSelect).at(1).find("select").simulate("change",
            {target: {value: 31}});
        wrapper.find(FilledSelect).at(2).find("select").simulate("change",
            {target: {value: 1901}});

        expect(wrapper.find(RegistrationInput).at(0).prop("value")).toBe(mockUsername);
        expect(wrapper.find(RegistrationInput).at(1).prop("value")).toBe(mockEmail);
        expect(wrapper.find(FilledSelect).at(0).prop("value")).toBe("Feb");
        expect(wrapper.find(FilledSelect).at(1).prop("value")).toBe(31);
        expect(wrapper.find(FilledSelect).at(2).prop("value")).toBe(1901);
        return {mockRegistrationData, mockOnOpenCustomize, mockOnChangeRegistrationInfo, mock, wrapper};
    }
});
