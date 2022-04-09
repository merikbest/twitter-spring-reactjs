import React from "react";
import {Route} from "react-router-dom";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import ForgotPassword from "../ForgotPassword";
import FindEmail from "../FindEmail/FindEmail";
import ResetPasswordOption from "../ResetPasswordOption/ResetPasswordOption";
import CheckEmailCode from "../CheckEmailCode/CheckEmailCode";
import ResetPassword from "../ResetPassword/ResetPassword";
import ResetPasswordSuccess from "../ResetPasswordSuccess/ResetPasswordSuccess";

describe("ForgotPassword", () => {
    
    it("should route correctly", () => {
        const wrapper = mountWithStore(<ForgotPassword/>, createMockRootState());
        const pathMap = wrapper.find(Route).reduce((pathMap: any, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});
        
        expect(wrapper.text().includes("Password Reset")).toBe(true);
        expect(pathMap["/account/forgot"]).toBe(FindEmail);
        expect(pathMap["/account/forgot/send_password_reset"]).toBe(ResetPasswordOption);
        expect(pathMap["/account/forgot/confirm_pin_reset"]).toBe(CheckEmailCode);
        expect(pathMap["/account/forgot/reset_password"]).toBe(ResetPassword);
        expect(pathMap["/account/forgot/password_reset_complete"]).toBe(ResetPasswordSuccess);
    });
});
