import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { AuthUserResponse } from "../../../types/user";
import { AuthApi } from "../authApi";
import {
    API_AUTH_FORGOT,
    API_AUTH_FORGOT_EMAIL,
    API_AUTH_LOGIN,
    API_AUTH_REGISTRATION_ACTIVATE,
    API_AUTH_REGISTRATION_CHECK,
    API_AUTH_REGISTRATION_CODE,
    API_AUTH_REGISTRATION_CONFIRM,
    API_AUTH_RESET,
    API_AUTH_RESET_CURRENT,
    API_USER_TOKEN
} from "../../../constants/endpoint-constants";
import { mockUser } from "../../../util/test-utils/mock-test-data";
import { testApiCall } from "../../../util/test-utils/api-test-helper";

describe("AuthApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";
    const mockAuthUserResponse = { user: mockUser, token: "test_token" };

    beforeEach(() => mockAdapter.reset());

    describe("should fetch AuthApi.signIn", () => {
        const mockRequest = { email: "test@test.com", password: "test_password" };
        const mockPasswordErrorResponse = "Incorrect password or email";

        it("[200] should Login Success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_LOGIN, 200, mockAuthUserResponse, AuthApi.signIn, mockRequest);
        });

        it("[404] should User not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_LOGIN, 404, mockUserErrorResponse, AuthApi.signIn, mockRequest);
        });

        it("[403] Incorrect password or email", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_LOGIN, 403, mockPasswordErrorResponse, AuthApi.signIn, mockRequest);
        });
    });

    describe("should fetch AuthApi.checkEmail", () => {
        const mockRequest = { username: "test_username", email: "test@test.com", birthday: "test_birthday" };
        const mockResponse = "User data checked.";
        const mockErrorResponse = "Email has already been taken.";

        it("[200] should Check Email Success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CHECK, 200, mockResponse, AuthApi.checkEmail, mockRequest);
        });

        it("[403] should return email error", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CHECK, 403, mockErrorResponse, AuthApi.checkEmail, mockRequest);
        });
    });

    describe("should fetch AuthApi.sendRegistrationCode", () => {
        const mockRequest = { username: "test_username", email: "test@test.com", birthday: "test_birthday" };
        const mockResponse = "Registration code sent successfully";

        it("[200] should send registration code success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CODE, 200, mockResponse, AuthApi.sendRegistrationCode, mockRequest);
        });

        it("[404] should User not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CODE, 404, mockUserErrorResponse, AuthApi.sendRegistrationCode, mockRequest);
        });
    });

    describe("should fetch AuthApi.checkRegistrationCode", () => {
        const mockRequest = "test_code";
        const mockUrl = `${API_AUTH_REGISTRATION_ACTIVATE}/${mockRequest}`;
        const mockResponse = "User successfully activated.";
        const mockErrorResponse = "Activation code not found.";

        it("[200] should check registration code success", () => {
            testApiCall(mockAdapter, "onGet", mockUrl, 200, mockResponse, AuthApi.checkRegistrationCode, mockRequest);
        });

        it("[404] should registration code not found", () => {
            testApiCall(mockAdapter, "onGet", mockUrl, 404, mockErrorResponse, AuthApi.checkRegistrationCode, mockRequest);
        });
    });

    describe("should fetch AuthApi.endRegistration", () => {
        const mockRequest = { email: "test@test.com", password: "test_birthday" };
        const mockPasswordError = "Your password needs to be at least 8 characters";

        it("[200] should end registration success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CONFIRM, 200, mockAuthUserResponse, AuthApi.endRegistration, mockRequest);
        });

        it("[400] should return bad request", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CONFIRM, 400, mockPasswordError, AuthApi.endRegistration, mockRequest);
        });

        it("[404] should User not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_REGISTRATION_CONFIRM, 404, mockUserErrorResponse, AuthApi.endRegistration, mockRequest);
        });
    });

    describe("should fetch AuthApi.findExistingEmail", () => {
        const mockRequest = { email: "test@test.com" };
        const mockResponse = "Reset password code is send to your E-mail";
        const mockError = "Email not found";

        it("[200] should find existing email success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_FORGOT_EMAIL, 200, mockResponse, AuthApi.findExistingEmail, mockRequest);
        });

        it("[404] should email not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_FORGOT_EMAIL, 404, mockError, AuthApi.findExistingEmail, mockRequest);
        });
    });

    describe("should fetch AuthApi.sendPasswordResetCode", () => {
        const mockRequest = { email: "test@test.com" };
        const mockResponse = "Reset password code is send to your E-mail";
        const mockError = "Email not found";

        it("[200] should send password reset code success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_FORGOT, 200, mockResponse, AuthApi.sendPasswordResetCode, mockRequest);
        });

        it("[404] should email not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_FORGOT, 404, mockError, AuthApi.sendPasswordResetCode, mockRequest);
        });
    });

    describe("should fetch AuthApi.getUserByResetCode", () => {
        const mockRequest = "test_code";
        const mockUrl = `${API_AUTH_RESET}/${mockRequest}`;
        const mockResponse = { id: 1 } as AuthUserResponse;
        const mockErrorResponse = "Password reset code is invalid!";

        it("[200] should get user by reset code success", () => {
            testApiCall(mockAdapter, "onGet", mockUrl, 200, mockResponse, AuthApi.getUserByResetCode, mockRequest);
        });

        it("[400] should password reset bad request", () => {
            testApiCall(mockAdapter, "onGet", mockUrl, 400, mockErrorResponse, AuthApi.getUserByResetCode, mockRequest);
        });
    });

    describe("should fetch AuthApi.passwordReset", () => {
        const mockRequest = { email: "test@test.com", password: "password_test", password2: "password2_test" };
        const mockResponse = "Password successfully changed!";
        const mockError = "Email not found";

        it("[200] should password reset success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_RESET, 200, mockResponse, AuthApi.passwordReset, mockRequest);
        });

        it("[404] should email not found", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_RESET, 404, mockError, AuthApi.passwordReset, mockRequest);
        });
    });

    describe("should fetch AuthApi.currentPasswordReset", () => {
        const mockRequest = {
            currentPassword: "password_test",
            password: "password_test",
            password2: "password2_test"
        };
        const mockResponse = "Your password has been successfully updated.";
        const mockError = "The password you entered was incorrect.";

        it("[200] should current password reset success", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_RESET_CURRENT, 200, mockResponse, AuthApi.currentPasswordReset, mockRequest);
        });

        it("[404] should password incorrect", () => {
            testApiCall(mockAdapter, "onPost", API_AUTH_RESET_CURRENT, 404, mockError, AuthApi.currentPasswordReset, mockRequest);
        });
    });

    describe("should fetch AuthApi.getMe", () => {
        it("[200] should get user success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_TOKEN, 200, mockAuthUserResponse, AuthApi.getMe);
        });

        it("[404] should User not found", () => {
            testApiCall(mockAdapter, "onGet", API_USER_TOKEN, 404, mockUserErrorResponse, AuthApi.getMe);
        });
    });
});
