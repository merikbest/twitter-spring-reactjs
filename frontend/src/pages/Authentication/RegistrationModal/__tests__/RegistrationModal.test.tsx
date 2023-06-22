import React from "react";
import { Button, Dialog } from "@material-ui/core";
import { setImmediate } from "timers";

import RegistrationModal from "../RegistrationModal";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import RegistrationInput from "../../RegistrationInput/RegistrationInput";
import { FilledSelect } from "../../../../components/FilledSelect/FilledSelect";
import { LoadingStatus } from "../../../../types/common";
import { RegistrationStep } from "../../../../types/auth";

describe("RegistrationModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockRootStore = {
        ...mockStore,
        authentication: { ...mockStore.authentication, registrationStep: RegistrationStep.STEP_1 }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should render empty RegistrationModal", () => {
        const wrapper = mountWithStore(<RegistrationModal />, mockStore);
        expect(wrapper.find(Dialog).prop("open")).toBe(false);
    });

    it("should render correctly RegistrationModal", () => {
        const wrapper = mountWithStore(<RegistrationModal />, mockRootStore);
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
        const wrapper = mountWithStore(<RegistrationModal />, mockRootStore);
        fillInputFields(wrapper, "test_username", "test@test.test");
        wrapper.find(Button).at(0).simulate("click");
        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).toHaveBeenCalled();
        });
    });

    it("should return error on submit form", (done) => {
        const wrapper = mountWithStore(<RegistrationModal />, mockRootStore);
        fillInputFields(wrapper);
        wrapper.find(Button).at(0).simulate("click");
        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(FilledSelect).at(0).prop("value")).toBe("Feb");
            expect(wrapper.find(FilledSelect).at(1).prop("value")).toBe(31);
            expect(wrapper.find(FilledSelect).at(2).prop("value")).toBe(1901);
            expect(wrapper.find(RegistrationInput).at(0).prop("helperText")).toBe("What is your name?");
            expect(wrapper.find(RegistrationInput).at(0).prop("error")).toBe(true);
            expect(wrapper.find(RegistrationInput).at(1).prop("helperText")).toBe("Please enter a valid email address.");
            expect(wrapper.find(RegistrationInput).at(1).prop("error")).toBe(true);
        });
    });

    const fillInputFields = (wrapper: any, username: string = "", email: string = ""): void => {
        wrapper.find(RegistrationInput).at(0).find("input").simulate("change",
            { target: { value: username } });
        wrapper.find(RegistrationInput).at(1).find("input").simulate("change",
            { target: { value: email } });
        wrapper.find(FilledSelect).at(0).find("select").simulate("change",
            { target: { value: "Feb" } });
        wrapper.find(FilledSelect).at(1).find("select").simulate("change",
            { target: { value: 31 } });
        wrapper.find(FilledSelect).at(2).find("select").simulate("change",
            { target: { value: 1901 } });
    };
});
