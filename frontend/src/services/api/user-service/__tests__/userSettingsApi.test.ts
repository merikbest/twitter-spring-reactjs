import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_SETTINGS_UPDATE_BACKGROUND_COLOR,
    API_SETTINGS_UPDATE_COLOR_SCHEME,
    API_SETTINGS_UPDATE_COUNTRY,
    API_SETTINGS_UPDATE_DIRECT,
    API_SETTINGS_UPDATE_EMAIL,
    API_SETTINGS_UPDATE_GENDER,
    API_SETTINGS_UPDATE_LANGUAGE,
    API_SETTINGS_UPDATE_PHONE,
    API_SETTINGS_UPDATE_PRIVATE,
    API_SETTINGS_UPDATE_USERNAME
} from "../../../../constants/endpoint-constants";
import { UserSettingsApi } from "../userSettingsApi";
import { BackgroundTheme, ColorScheme } from "../../../../types/common";
import { mockUser } from "../../../../util/test-utils/mock-test-data";

describe("UserSettingsApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockRequest = {
        username: "test",
        email: "test@test.test",
        countryCode: "111",
        phone: 1234567,
        country: "test",
        gender: "test",
        language: "test",
        mutedDirectMessages: true,
        privateProfile: true,
        colorScheme: ColorScheme.GREEN,
        backgroundColor: BackgroundTheme.LIGHTS_OUT
    };

    beforeEach(() => mockAdapter.reset());

    describe("should call UserSettingsApi.updateUsername", () => {
        it("[200] should update username Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_USERNAME, 200, "test", UserSettingsApi.updateUsername, mockRequest);
        });

        it("[400] should return Incorrect username length error", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_USERNAME, 400, "Incorrect username length", UserSettingsApi.updateUsername, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateEmail", () => {
        const mockAuthUserResponse = { user: mockUser, token: "test_token" };

        it("[200] should update email Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_EMAIL, 200, mockAuthUserResponse, UserSettingsApi.updateEmail, mockRequest);
        });

        it("[403] should return Email has already been taken error", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_EMAIL, 403, "Email has already been taken.", UserSettingsApi.updateEmail, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updatePhone", () => {
        const mockChangePhoneResponse = { countryCode: "test", phone: 123456789 };

        it("[200] should update phone Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_PHONE, 200, mockChangePhoneResponse, UserSettingsApi.updatePhone, mockRequest);
        });

        it("[400] should return Not valid phone number error", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_PHONE, 400, "Not valid phone number", UserSettingsApi.updatePhone, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateCountry", () => {
        it("[200] should update country Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_COUNTRY, 200, "test", UserSettingsApi.updateCountry, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateGender", () => {
        it("[200] should update gender Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_GENDER, 200, "test", UserSettingsApi.updateGender, mockRequest);
        });

        it("[400] should return Incorrect gender length error", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_GENDER, 400, "Incorrect gender length", UserSettingsApi.updateGender, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateLanguage", () => {
        it("[200] should update language Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_LANGUAGE, 200, "test", UserSettingsApi.updateLanguage, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateDirectMessageRequests", () => {
        it("[200] should update direct message requests Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_DIRECT, 200, true, UserSettingsApi.updateDirectMessageRequests, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updatePrivateProfile", () => {
        it("[200] should update private profile Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_PRIVATE, 200, true, UserSettingsApi.updatePrivateProfile, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateColorScheme", () => {
        it("[200] should update color scheme Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_COLOR_SCHEME, 200, ColorScheme.GREEN, UserSettingsApi.updateColorScheme, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateBackgroundColor", () => {
        it("[200] should update background color Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_BACKGROUND_COLOR, 200, BackgroundTheme.LIGHTS_OUT, UserSettingsApi.updateBackgroundColor, mockRequest);
        });
    });
});
