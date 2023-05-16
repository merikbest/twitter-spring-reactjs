import React from "react";
import { Button } from "@material-ui/core";
import { mountWithStore } from "../../../util/test-utils/test-helper";
import Authentication from "../Authentication";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import { ACCOUNT_LOGIN } from "../../../constants/path-constants";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

describe("Authentication", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Authentication />);
        expect(wrapper.find(Button).at(0).text()).toEqual("Sign up");
        expect(wrapper.find(Button).at(1).text()).toEqual("Log in");
    });

    it("should render RegistrationModal on click Sign Up button", () => {
        const wrapper = mountWithStore(<Authentication />);
        wrapper.find(Button).at(0).simulate("click");
        const registrationModal = wrapper.find(RegistrationModal);
        expect(registrationModal.exists()).toBe(true);
        expect(registrationModal.text().includes("Create your account")).toBe(true);
    });

    it("should route to Login page on click Log In button", () => {
        const wrapper = mountWithStore(<Authentication />);
        wrapper.find(Button).at(1).simulate("click");
        expect(mockHistoryPush).toHaveBeenCalledWith(ACCOUNT_LOGIN);
    });
});
