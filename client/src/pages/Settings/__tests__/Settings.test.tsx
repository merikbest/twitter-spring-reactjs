import React, {Component} from "react";
import {Route} from "react-router-dom";
import routeData from "react-router";
import {ReactWrapper} from "enzyme";
import {ListItem} from "@material-ui/core";

import Settings from "../Settings";
import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import FindEmail from "../../ForgotPassword/FindEmail/FindEmail";
import ResetPasswordOption from "../../ForgotPassword/ResetPasswordOption/ResetPasswordOption";
import CheckEmailCode from "../../ForgotPassword/CheckEmailCode/CheckEmailCode";
import ResetPassword from "../../ForgotPassword/ResetPassword/ResetPassword";
import ResetPasswordSuccess from "../../ForgotPassword/ResetPasswordSuccess/ResetPasswordSuccess";
import {
    SETTINGS,
    SETTINGS_ABOUT,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES,
    SETTINGS_INFO,
    SETTINGS_NOTIFICATION,
    SETTINGS_PRIVACY_AND_SAFETY,
    SETTINGS_SECURITY_AND_ACCOUNT_ACCESS
} from "../../../util/pathConstants";

describe("Settings", () => {

    it("should navigate to Your account", () => {
        testNavigation(SETTINGS, "Your account", 0);
    });

    it("should navigate to Security and account access", () => {
        testNavigation(SETTINGS_SECURITY_AND_ACCOUNT_ACCESS, "Security and account access", 1);
    });

    it("should navigate to Privacy and safety", () => {
        testNavigation(SETTINGS_PRIVACY_AND_SAFETY, "Privacy and safety", 2);
    });

    it("should navigate to Notifications", () => {
        testNavigation(SETTINGS_NOTIFICATION, "Notifications", 3);
    });

    it("should navigate to Accessibility, display, and languages", () => {
        testNavigation(SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES, "Accessibility, display, and languages", 4);
    });

    it("should navigate to Additional resources", () => {
        testNavigation(SETTINGS_ABOUT, "Additional resources", 5);
    });

    it("should navigate back to Your account", () => {
        testNavigation(SETTINGS_INFO, "Your account", 0);
    });

    it("should click and navigate to Your account", () => {
        testClickNavigation("Your account", 0);
    });

    it("should click and navigate to Security and account access", () => {
        testClickNavigation("Security and account access", 1);
    });

    it("should click and navigate to Privacy and safety", () => {
        testClickNavigation("Privacy and safety", 2);
    });

    it("should click and navigate to Notifications", () => {
        testClickNavigation("Notifications", 3);
    });

    it("should click and navigate to Accessibility, display, and languages", () => {
        testClickNavigation("Accessibility, display, and languages", 4);
    });
    
    it("should click and navigate to Additional resources", () => {
        testClickNavigation("Additional resources", 5);
    });

    it("should route correctly", () => {
        const wrapper = createWrapper();
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
    // |   98.98 |      100 |      90 |   98.94 | 565
    const testNavigation = (pathname: string, mockText: string, itemIndex: number): void => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: pathname, hash: "", search: "", state: ""
        });
        const wrapper = createWrapper();
        testListItems(wrapper, mockText, itemIndex);
    };

    const testClickNavigation = (mockText: string, itemIndex: number): void => {
        const wrapper = createWrapper();
        wrapper.find(ListItem).at(itemIndex).simulate("click");
        testListItems(wrapper, mockText, itemIndex);
    };

    const createWrapper = (): ReactWrapper<any, Component["state"], Component> => {
        const mockStore = createMockRootState(LoadingStatus.LOADED);
        return mountWithStore(<Settings changeBackgroundColor={jest.fn()} changeColorScheme={jest.fn()}/>, mockStore);
    };

    const testListItems = (wrapper: ReactWrapper<any, Component["state"], Component>, mockText: string, itemIndex: number): void => {
        expect(wrapper.find(ListItem).at(itemIndex).prop("selected")).toBe(true);
        expect(wrapper.find(ListItem).at(itemIndex).text().includes(mockText)).toBe(true);
    };
});


// const pathMap = wrapper.find(Route).reduce((pathMap: any, route) => {
//     const routeProps = route.props();
//     pathMap[routeProps.path] = routeProps.component;
//     return pathMap;
// }, {});

// expect(wrapper.text().includes("Password Reset")).toBe(true);
// expect(pathMap["/settings"]).toBe(Account);
// expect(pathMap["/account/forgot/send_password_reset"]).toBe(ResetPasswordOption);
// expect(pathMap["/account/forgot/confirm_pin_reset"]).toBe(CheckEmailCode);
// expect(pathMap["/account/forgot/reset_password"]).toBe(ResetPassword);
// expect(pathMap["/account/forgot/password_reset_complete"]).toBe(ResetPasswordSuccess);