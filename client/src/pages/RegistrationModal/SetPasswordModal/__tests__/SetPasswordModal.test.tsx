import React from "react";
import {createMemoryHistory} from "history";
import {Button, Dialog} from "@material-ui/core";

import SetPasswordModal from "../SetPasswordModal";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import {RegistrationInputField} from "../../RegistrationInput/RegistrationInputField";
import {UserActionsType} from "../../../../store/ducks/user/contracts/actionTypes";

describe("SetPasswordModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should CreateAccountModal and submit form", (done) => {
        const history = createMemoryHistory();
        const mockRegistrationData = {email: "test@test.test", password: "test_password", history: history};
        const wrapper = mountWithStore(
            <SetPasswordModal
                email={"test@test.test"}
                open={true}
                onClose={jest.fn()}
            />, mockStore, history);

        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("You'll need a password")).toBe(true);
        expect(wrapper.text().includes("Make sure it’s 8 characters or more.")).toBe(true);
        expect(wrapper.find(Button).text().includes("Next")).toBe(true);
        
        wrapper.find(RegistrationInputField).find("input").simulate("change", {target: {value: "test_password"}});
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: mockRegistrationData,
                type: UserActionsType.FETCH_SIGN_UP
            });
        });
    });

    it("should render password error", (done) => {
        const mockText = "Your password needs to be at least 8 characters. Please enter a longer one.";
        const wrapper = mountWithStore(
            <SetPasswordModal
                email={"test@test.test"}
                open={true}
                onClose={jest.fn()}
            />, mockStore);
        
        wrapper.find(RegistrationInputField).find("input").simulate("change", {target: {value: "test"}});
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(RegistrationInputField).prop("helperText")).toBe(mockText);
            expect(wrapper.find(RegistrationInputField).prop("error")).toBe(true);
        });
    });
});
