import React from "react";

import AccountInformation from "../AccountInformation";
import {
    createMockRootState,
    mockDispatch,
    mountWithStore,
    testClickOnLink
} from "../../../../../util/test-utils/test-helper";
import { getCountry, getPhoneCode } from "../../../../../util/country-code-helper";
import { formatScheduleDate } from "../../../../../util/format-date-helper";
import {
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES,
    SETTINGS_INFO_AGE,
    SETTINGS_INFO_COUNTRY,
    SETTINGS_INFO_EMAIL,
    SETTINGS_INFO_GENDER,
    SETTINGS_INFO_PHONE,
    SETTINGS_INFO_USERNAME,
    SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE
} from "../../../../../constants/path-constants";
import { AuthUserResponse } from "../../../../../types/user";
import { UserActionsType } from "../../../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../../../types/common";

describe("AccountInformation", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockUser = mockStore.user.data as AuthUserResponse;
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AccountInformation />, mockStore);

        expect(wrapper.text().includes("Username")).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.text().includes("Phone")).toBe(true);
        expect(wrapper.text().includes(`${getPhoneCode(mockUser.countryCode)}${mockUser.phone}`)).toBe(true);
        expect(wrapper.text().includes("Email")).toBe(true);
        expect(wrapper.text().includes(mockUser.email)).toBe(true);
        expect(wrapper.text().includes("Protected Tweets")).toBe(true);
        expect(wrapper.text().includes("No")).toBe(true);
        expect(wrapper.text().includes("Account creation")).toBe(true);
        expect(wrapper.text().includes(formatScheduleDate(new Date(mockUser.registrationDate)))).toBe(true);
        expect(wrapper.text().includes("Country")).toBe(true);
        expect(wrapper.text().includes(getCountry(mockUser.countryCode))).toBe(true);
        expect(wrapper.text().includes("Languages")).toBe(true);
        expect(wrapper.text().includes(mockUser.language)).toBe(true);
        expect(wrapper.text().includes("Gender")).toBe(true);
        expect(wrapper.text().includes(mockUser.gender)).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { type: UserActionsType.FETCH_USER_DATA });
    });

    it("should link to Username", () => {
        testClickOnLink(<AccountInformation />, SETTINGS_INFO_USERNAME, 0);
    });

    it("should link to Phone", () => {
        testClickOnLink(<AccountInformation />, SETTINGS_INFO_PHONE, 1);
    });

    it("should link to Email", () => {
        testClickOnLink(<AccountInformation />, SETTINGS_INFO_EMAIL, 2);
    });

    it("should link to Protected Tweets", () => {
        testClickOnLink(<AccountInformation />, SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE, 3);
    });

    it("should link to Country", () => {
        testClickOnLink(<AccountInformation />, SETTINGS_INFO_COUNTRY, 4);
    });

    it("should link to Languages", () => {
        testClickOnLink(<AccountInformation />, SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES, 5);
    });

    it("should link to Gender", () => {
        testClickOnLink(<AccountInformation />, SETTINGS_INFO_GENDER, 6);
    });

    it("should link to Age", () => {
        testClickOnLink(<AccountInformation />, SETTINGS_INFO_AGE, 7);
    });
});
