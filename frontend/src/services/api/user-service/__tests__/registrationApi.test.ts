import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_AUTH_REGISTRATION_ACTIVATE,
    API_AUTH_REGISTRATION_CHECK,
    API_AUTH_REGISTRATION_CODE, API_AUTH_REGISTRATION_CONFIRM
} from "../../../../constants/endpoint-constants";
import { mockUser } from "../../../../util/test-utils/mock-test-data";
import { RegistrationApi } from "../registrationApi";

describe("RegistrationApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";
    const mockAuthUserResponse = { user: mockUser, token: "test_token" };

    beforeEach(() => mockAdapter.reset());

    describe("should fetch RegistrationApi.registration", () => {
        const mockRequest = { username: "test_username", email: "test@test.com", birthday: "test_birthday" };
        const mockResponse = "User data checked.";
        const mockErrorResponse = "Email has already been taken.";

        it("[200] should Check Email Success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CHECK, 200, mockResponse, RegistrationApi.registration, mockRequest);
        });

        it("[403] should return email error", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CHECK, 403, mockErrorResponse, RegistrationApi.registration, mockRequest);
        });
    });

    describe("should fetch RegistrationApi.sendRegistrationCode", () => {
        const mockRequest = { username: "test_username", email: "test@test.com", birthday: "test_birthday" };
        const mockResponse = "Registration code sent successfully";

        it("[200] should send registration code success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CODE, 200, mockResponse, RegistrationApi.sendRegistrationCode, mockRequest);
        });

        it("[404] should User not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CODE, 404, mockUserErrorResponse, RegistrationApi.sendRegistrationCode, mockRequest);
        });
    });

    describe("should fetch RegistrationApi.checkRegistrationCode", () => {
        const mockRequest = "test_code";
        const mockUrl = `${API_AUTH_REGISTRATION_ACTIVATE}/${mockRequest}`;
        const mockResponse = "User successfully activated.";
        const mockErrorResponse = "Activation code not found.";

        it("[200] should check registration code success", () => {
            testApiCall(mockAdapter, "onGet", mockUrl, 200, mockResponse, RegistrationApi.checkRegistrationCode, mockRequest);
        });

        it("[404] should registration code not found", () => {
            testApiCall(mockAdapter, "onGet", mockUrl, 404, mockErrorResponse, RegistrationApi.checkRegistrationCode, mockRequest);
        });
    });

    describe("should fetch RegistrationApi.endRegistration", () => {
        const mockRequest = { email: "test@test.com", password: "test_birthday" };
        const mockPasswordError = "Your password needs to be at least 8 characters";

        it("[200] should end registration success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CONFIRM, 200, mockAuthUserResponse, RegistrationApi.endRegistration, mockRequest);
        });

        it("[400] should return bad request", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CONFIRM, 400, mockPasswordError, RegistrationApi.endRegistration, mockRequest);
        });

        it("[404] should User not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CONFIRM, 404, mockUserErrorResponse, RegistrationApi.endRegistration, mockRequest);
        });
    });
});
