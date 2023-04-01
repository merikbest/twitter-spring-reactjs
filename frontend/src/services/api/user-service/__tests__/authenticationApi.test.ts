import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { mockUser } from "../../../../util/test-utils/mock-test-data";
import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_AUTH_FORGOT,
    API_AUTH_FORGOT_EMAIL,
    API_AUTH_LOGIN,
    API_AUTH_RESET,
    API_AUTH_RESET_CURRENT
} from "../../../../constants/endpoint-constants";
import { AuthUserResponse } from "../../../../types/user";
import { AuthenticationApi } from "../authenticationApi";

describe("AuthenticationApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";
    const mockAuthUserResponse = { user: mockUser, token: "test_token" };

    beforeEach(() => mockAdapter.reset());

    describe("should fetch AuthenticationApi.login", () => {
        const mockRequest = { email: "test@test.com", password: "test_password" };
        const mockPasswordErrorResponse = "Incorrect password or email";

        it("[200] should Login Success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_LOGIN, 200, mockAuthUserResponse, AuthenticationApi.login, mockRequest);
        });

        it("[404] should User not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_LOGIN, 404, mockUserErrorResponse, AuthenticationApi.login, mockRequest);
        });

        it("[403] Incorrect password or email", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_LOGIN, 403, mockPasswordErrorResponse, AuthenticationApi.login, mockRequest);
        });
    });

    describe("should fetch AuthenticationApi.getExistingEmail", () => {
        const mockRequest = { email: "test@test.com" };
        const mockResponse = "Reset password code is send to your E-mail";
        const mockError = "Email not found";

        it("[200] should find existing email success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_FORGOT_EMAIL, 200, mockResponse, AuthenticationApi.getExistingEmail, mockRequest);
        });

        it("[404] should email not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_FORGOT_EMAIL, 404, mockError, AuthenticationApi.getExistingEmail, mockRequest);
        });
    });

    describe("should fetch AuthenticationApi.sendPasswordResetCode", () => {
        const mockRequest = { email: "test@test.com" };
        const mockResponse = "Reset password code is send to your E-mail";
        const mockError = "Email not found";

        it("[200] should send password reset code success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_FORGOT, 200, mockResponse, AuthenticationApi.sendPasswordResetCode, mockRequest);
        });

        it("[404] should email not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_FORGOT, 404, mockError, AuthenticationApi.sendPasswordResetCode, mockRequest);
        });
    });

    describe("should fetch AuthenticationApi.getUserByPasswordResetCode", () => {
        const mockRequest = "test_code";
        const mockUrl = `${API_AUTH_RESET}/${mockRequest}`;
        const mockResponse = { id: 1 } as AuthUserResponse;
        const mockErrorResponse = "Password reset code is invalid!";

        it("[200] should get user by reset code success", () => {
            testApiCall(mockAdapter, "onGet", mockUrl, 200, mockResponse, AuthenticationApi.getUserByPasswordResetCode, mockRequest);
        });

        it("[400] should password reset bad request", () => {
            testApiCall(mockAdapter, "onGet", mockUrl, 400, mockErrorResponse, AuthenticationApi.getUserByPasswordResetCode, mockRequest);
        });
    });

    describe("should fetch AuthenticationApi.passwordReset", () => {
        const mockRequest = { email: "test@test.com", password: "password_test", password2: "password2_test" };
        const mockResponse = "Password successfully changed!";
        const mockError = "Email not found";

        it("[200] should password reset success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_RESET, 200, mockResponse, AuthenticationApi.passwordReset, mockRequest);
        });

        it("[404] should email not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_RESET, 404, mockError, AuthenticationApi.passwordReset, mockRequest);
        });
    });

    describe("should fetch AuthenticationApi.currentPasswordReset", () => {
        const mockRequest = {
            currentPassword: "password_test",
            password: "password_test",
            password2: "password2_test"
        };
        const mockResponse = "Your password has been successfully updated.";
        const mockError = "The password you entered was incorrect.";

        it("[200] should current password reset success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_RESET_CURRENT, 200, mockResponse, AuthenticationApi.currentPasswordReset, mockRequest);
        });

        it("[404] should password incorrect", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_RESET_CURRENT, 404, mockError, AuthenticationApi.currentPasswordReset, mockRequest);
        });
    });
});
