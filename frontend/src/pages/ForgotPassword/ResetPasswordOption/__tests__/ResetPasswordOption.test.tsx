import React from "react";
import routeData from "react-router";
import axios from "axios";
import { Button } from "@material-ui/core";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import { setImmediate } from "timers";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import ResetPasswordOption from "../ResetPasswordOption";
import { API_AUTH_FORGOT } from "../../../../constants/endpoint-constants";
import {
    ACCOUNT_FORGOT_CONFIRM_PIN_RESET,
    ACCOUNT_FORGOT_SEND_PASSWORD_RESET
} from "../../../../constants/path-constants";

describe("ResetPasswordOption", () => {
    const mockStore = createMockRootState();
    const mockUser = mockStore.user.data;

    beforeEach(() => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: ACCOUNT_FORGOT_SEND_PASSWORD_RESET, hash: "", search: "", state: { email: mockUser?.email }
        });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ResetPasswordOption />, mockStore);

        expect(wrapper.text().includes("How do you want to reset your password?")).toBe(true);
        expect(wrapper.text().includes("You can use the information associated with your account.")).toBe(true);
        expect(wrapper.text().includes(`Send an email to ${mockUser?.email}`)).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Next");
    });

    it("should redirect to CheckEmailCode on submit", (done) => {
        const mock = new MockAdapter(axios);
        mock.onPost(API_AUTH_FORGOT, { email: mockUser?.email }).reply(200);
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<ResetPasswordOption />, mockStore, history);
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(pushSpy).toHaveBeenCalled();
            expect(pushSpy).toHaveBeenCalledWith(ACCOUNT_FORGOT_CONFIRM_PIN_RESET);
        });
    });
});
