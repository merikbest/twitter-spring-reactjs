import React from "react";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import axios from "axios";
import { Button, Link as MuiLink } from "@material-ui/core";
import { setImmediate } from "timers";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import CheckEmailCode from "../CheckEmailCode";
import { ForgotPasswordTextField } from "../../ForgotPasswordTextField/ForgotPasswordTextField";
import { API_AUTH_RESET } from "../../../../constants/endpoint-constants";
import { mockUser } from "../../../../util/test-utils/mock-test-data";
import { ACCOUNT_FORGOT_RESET_PASSWORD } from "../../../../constants/path-constants";

describe("CheckEmailCode", () => {
    const mockStore = createMockRootState();
    const mockResetCode = "123456";

    it("should render correctly", () => {
        const wrapper = mountWithStore(<CheckEmailCode />, mockStore);

        expect(wrapper.text().includes("Check your email")).toBe(true);
        expect(wrapper.text().includes("You'll receive a code to verify here so you can reset your account password.")).toBe(true);
        expect(wrapper.text().includes("If you don't see the email, check other places it might be, like your junk, spam, social, or other folders.")).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Verify");
        expect(wrapper.find(MuiLink).at(0).text()).toEqual("Didn’t receive your code?");
    });

    it("should verify reset code", (done) => {
        const mock = new MockAdapter(axios);
        mock.onGet(`${API_AUTH_RESET}/${mockResetCode}`).reply(200, mockUser);
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<CheckEmailCode />, createMockRootState(), history);
        const input = wrapper.find(ForgotPasswordTextField).find("input").at(0);

        input.simulate("change", { target: { value: mockResetCode } });
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(pushSpy).toHaveBeenCalled();
            expect(pushSpy).toHaveBeenCalledWith({
                pathname: ACCOUNT_FORGOT_RESET_PASSWORD,
                state: { user: mockUser }
            });
        });
    });

    it("should return error on verify code", (done) => {
        const mock = new MockAdapter(axios);
        mock.onGet(`${API_AUTH_RESET}/${mockResetCode}`).reply(400, mockUser);
        const wrapper = mountWithStore(<CheckEmailCode />, mockStore);
        const input = wrapper.find(ForgotPasswordTextField).find("input").at(0);

        input.simulate("change", { target: { value: mockResetCode } });
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.text().includes("Incorrect code. Please try again.")).toBe(true);
        });
    });

    it("should return error if reset code empty", () => {
        const wrapper = mountWithStore(<CheckEmailCode />, mockStore);
        const input = wrapper.find(ForgotPasswordTextField).find("input").at(0);

        input.simulate("change", { target: { value: "" } });
        wrapper.find(Button).at(0).simulate("submit");

        expect(wrapper.text().includes("Incorrect code. Please try again.")).toBe(true);
    });
});
