import React from "react";
import { Route } from "react-router-dom";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import ForgotPassword from "../ForgotPassword";
import FindEmail from "../FindEmail";
import ResetPasswordOption from "../ResetPasswordOption";
import CheckEmailCode from "../CheckEmailCode";
import ResetPassword from "../ResetPassword";
import ResetPasswordSuccess from "../ResetPasswordSuccess";
import {
    ACCOUNT_FORGOT,
    ACCOUNT_FORGOT_CONFIRM_PIN_RESET,
    ACCOUNT_FORGOT_PASSWORD_RESET_COMPLETE,
    ACCOUNT_FORGOT_RESET_PASSWORD,
    ACCOUNT_FORGOT_SEND_PASSWORD_RESET
} from "../../../constants/path-constants";

describe("ForgotPassword", () => {

    it("should route correctly", () => {
        const wrapper = mountWithStore(<ForgotPassword />, createMockRootState());
        const pathMap = wrapper.find(Route).reduce((pathMap: any, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});

        expect(wrapper.text().includes("Password Reset")).toBe(true);
        expect(pathMap[ACCOUNT_FORGOT]).toBe(FindEmail);
        expect(pathMap[ACCOUNT_FORGOT_SEND_PASSWORD_RESET]).toBe(ResetPasswordOption);
        expect(pathMap[ACCOUNT_FORGOT_CONFIRM_PIN_RESET]).toBe(CheckEmailCode);
        expect(pathMap[ACCOUNT_FORGOT_RESET_PASSWORD]).toBe(ResetPassword);
        expect(pathMap[ACCOUNT_FORGOT_PASSWORD_RESET_COMPLETE]).toBe(ResetPasswordSuccess);
    });
});
