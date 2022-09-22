import axios, {AxiosResponse} from "axios";
import MockAdapter from "axios-mock-adapter";

import {AuthUserResponse} from "../../../store/types/user";
import {AuthApi} from "../authApi";
import {LoginProps} from "../../../pages/Login/Login";
import {RegistrationInfo} from "../../../pages/Authentication/Authentication";
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
    API_AUTH_USER
} from "../../../util/endpoints";
import {RegistrationProps} from "../../../pages/RegistrationModal/SetPasswordModal/SetPasswordModal";

describe("AuthApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";
    const mockAuthUserResponse = {user: {id: 1} as AuthUserResponse, token: "test_token"};

    beforeEach(() => mockAdapter.reset());

    describe("should fetch AuthApi.signIn", () => {
        const mockRequest = {email: "test@test.com", password: "test_password"} as LoginProps;
        const mockPasswordErrorResponse = "Incorrect password or email";

        it("[200] should Login Success", () => {
            mockAdapter.onPost(API_AUTH_LOGIN, mockRequest).reply(200, mockAuthUserResponse);
            AuthApi.signIn(mockRequest).then((response) => {
                testApiCall(200, response, API_AUTH_LOGIN, mockAuthUserResponse);
            });
        });

        it("[404] should User not found", () => {
            mockAdapter.onPost(API_AUTH_LOGIN, mockRequest).reply(404, mockUserErrorResponse);
            AuthApi.signIn(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, API_AUTH_LOGIN, mockUserErrorResponse);
                });
        });

        it("[403] Incorrect password or email", () => {
            mockAdapter.onPost(API_AUTH_LOGIN, mockRequest).reply(403, mockPasswordErrorResponse);
            AuthApi.signIn(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(403, error.response, API_AUTH_LOGIN, mockPasswordErrorResponse);
                });
        });
    });

    describe("should fetch AuthApi.checkEmail", () => {
        const mockRequest = {
            username: "test_username",
            email: "test@test.com",
            birthday: "test_birthday"
        } as RegistrationInfo;
        const mockResponse = "User data checked.";
        const mockErrorResponse = "Email has already been taken.";

        it("[200] should Check Email Success", () => {
            mockAdapter.onPost(API_AUTH_REGISTRATION_CHECK, mockRequest).reply(200, mockResponse);
            AuthApi.checkEmail(mockRequest).then((response) => {
                testApiCall(200, response, API_AUTH_REGISTRATION_CHECK, mockResponse);
            });
        });

        it("[403] should return email error", () => {
            mockAdapter.onPost(API_AUTH_REGISTRATION_CHECK, mockRequest).reply(403, mockErrorResponse);
            AuthApi.checkEmail(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(403, error.response, API_AUTH_REGISTRATION_CHECK, mockErrorResponse);
                });
        });
    });

    describe("should fetch AuthApi.sendRegistrationCode", () => {
        const mockRequest = {
            username: "test_username",
            email: "test@test.com",
            birthday: "test_birthday"
        } as RegistrationInfo;
        const mockResponse = "Registration code sent successfully";

        it("[200] should send registration code success", () => {
            mockAdapter.onPost(API_AUTH_REGISTRATION_CODE, mockRequest).reply(200, mockResponse);
            AuthApi.sendRegistrationCode(mockRequest).then((response) => {
                testApiCall(200, response, API_AUTH_REGISTRATION_CODE, mockResponse);
            });
        });

        it("[404] should User not found", () => {
            mockAdapter.onPost(API_AUTH_REGISTRATION_CODE, mockRequest).reply(404, mockUserErrorResponse);
            AuthApi.sendRegistrationCode(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, API_AUTH_REGISTRATION_CODE, mockUserErrorResponse);
                });
        });
    });

    describe("should fetch AuthApi.checkRegistrationCode", () => {
        const mockRequest = "test_code";
        const mockUrl = `${API_AUTH_REGISTRATION_ACTIVATE}/${mockRequest}`;
        const mockResponse = "User successfully activated.";
        const mockErrorResponse = "Activation code not found.";

        it("[200] should check registration code success", () => {
            mockAdapter.onGet(mockUrl).reply(200, mockResponse);
            AuthApi.checkRegistrationCode(mockRequest).then((response) => {
                testApiCall(200, response, mockUrl, mockResponse);
            });
        });

        it("[404] should registration code not found", () => {
            mockAdapter.onGet(mockUrl).reply(404, mockErrorResponse);
            AuthApi.checkRegistrationCode(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, mockUrl, mockErrorResponse);
                });
        });
    });

    describe("should fetch AuthApi.endRegistration", () => {
        const mockRequest = {
            email: "test@test.com",
            password: "test_birthday"
        } as RegistrationProps;
        const mockPasswordError = "Your password needs to be at least 8 characters";

        it("[200] should end registration success", () => {
            mockAdapter.onPost(API_AUTH_REGISTRATION_CONFIRM, mockRequest).reply(200, mockAuthUserResponse);
            AuthApi.endRegistration(mockRequest).then((response) => {
                testApiCall(200, response, API_AUTH_REGISTRATION_CONFIRM, mockAuthUserResponse);
            });
        });

        it("[400] should return bad request", () => {
            mockAdapter.onPost(API_AUTH_REGISTRATION_CONFIRM, mockRequest).reply(400, mockPasswordError);
            AuthApi.endRegistration(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(400, error.response, API_AUTH_REGISTRATION_CONFIRM, mockPasswordError);
                });
        });

        it("[404] should User not found", () => {
            mockAdapter.onPost(API_AUTH_REGISTRATION_CONFIRM, mockRequest).reply(404, mockUserErrorResponse);
            AuthApi.endRegistration(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, API_AUTH_REGISTRATION_CONFIRM, mockUserErrorResponse);
                });
        });
    });

    describe("should fetch AuthApi.findExistingEmail", () => {
        const mockRequest = {email: "test@test.com"};
        const mockResponse = "Reset password code is send to your E-mail";
        const mockError = "Email not found";

        it("[200] should find existing email success", () => {
            mockAdapter.onPost(API_AUTH_FORGOT_EMAIL, mockRequest).reply(200, mockResponse);
            AuthApi.findExistingEmail(mockRequest).then((response) => {
                testApiCall(200, response, API_AUTH_FORGOT_EMAIL, mockResponse);
            });
        });

        it("[404] should email not found", () => {
            mockAdapter.onPost(API_AUTH_FORGOT_EMAIL, mockRequest).reply(404, mockError);
            AuthApi.findExistingEmail(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, API_AUTH_FORGOT_EMAIL, mockError);
                });
        });
    });

    describe("should fetch AuthApi.sendPasswordResetCode", () => {
        const mockRequest = {email: "test@test.com"};
        const mockResponse = "Reset password code is send to your E-mail";
        const mockError = "Email not found";

        it("[200] should send password reset code success", () => {
            mockAdapter.onPost(API_AUTH_FORGOT, mockRequest).reply(200, mockResponse);
            AuthApi.sendPasswordResetCode(mockRequest).then((response) => {
                testApiCall(200, response, API_AUTH_FORGOT, mockResponse);
            });
        });

        it("[404] should email not found", () => {
            mockAdapter.onPost(API_AUTH_FORGOT, mockRequest).reply(404, mockError);
            AuthApi.sendPasswordResetCode(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, API_AUTH_FORGOT, mockError);
                });
        });
    });

    describe("should fetch AuthApi.getUserByResetCode", () => {
        const mockRequest = "test_code";
        const mockUrl = `${API_AUTH_RESET}/${mockRequest}`;
        const mockResponse = {id: 1} as AuthUserResponse;
        const mockErrorResponse = "Password reset code is invalid!";

        it("[200] should get user by reset code success", () => {
            mockAdapter.onGet(mockUrl).reply(200, mockResponse);
            AuthApi.getUserByResetCode(mockRequest).then((response) => {
                testApiCall(200, response, mockUrl, mockResponse);
            });
        });

        it("[400] should password reset bad request", () => {
            mockAdapter.onGet(mockUrl).reply(400, mockErrorResponse);
            AuthApi.getUserByResetCode(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(400, error.response, mockUrl, mockErrorResponse);
                });
        });
    });

    describe("should fetch AuthApi.passwordReset", () => {
        const mockRequest = {email: "test@test.com", password: "password_test", password2: "password2_test"};
        const mockResponse = "Password successfully changed!";
        const mockError = "Email not found";

        it("[200] should password reset success", () => {
            mockAdapter.onPost(API_AUTH_RESET, mockRequest).reply(200, mockResponse);
            AuthApi.passwordReset(mockRequest).then((response) => {
                testApiCall(200, response, API_AUTH_RESET, mockResponse);
            });
        });

        it("[404] should email not found", () => {
            mockAdapter.onPost(API_AUTH_RESET, mockRequest).reply(404, mockError);
            AuthApi.passwordReset(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, API_AUTH_RESET, mockError);
                });
        });
    });

    describe("should fetch AuthApi.currentPasswordReset", () => {
        const mockRequest = {currentPassword: "password_test", password: "password_test", password2: "password2_test"};
        const mockResponse = "Your password has been successfully updated.";
        const mockError = "The password you entered was incorrect.";

        it("[200] should current password reset success", () => {
            mockAdapter.onPost(API_AUTH_RESET_CURRENT, mockRequest).reply(200, mockResponse);
            AuthApi.currentPasswordReset(mockRequest).then((response) => {
                testApiCall(200, response, API_AUTH_RESET_CURRENT, mockResponse);
            });
        });

        it("[404] should password incorrect", () => {
            mockAdapter.onPost(API_AUTH_RESET_CURRENT, mockRequest).reply(404, mockError);
            AuthApi.currentPasswordReset(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, API_AUTH_RESET_CURRENT, mockError);
                });
        });
    });

    describe("should fetch AuthApi.getMe", () => {

        it("[200] should get user success", () => {
            mockAdapter.onGet(API_AUTH_USER).reply(200, mockAuthUserResponse);
            AuthApi.getMe().then((response) => {
                testApiCall(200, response, API_AUTH_USER, mockAuthUserResponse);
            });
        });

        it("[404] should User not found", () => {
            mockAdapter.onGet(API_AUTH_USER).reply(404, mockUserErrorResponse);
            AuthApi.getMe().then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, API_AUTH_USER, mockUserErrorResponse);
                });
        });
    });

    const testApiCall = (statusCode: number, response: AxiosResponse, expectedUrl: string, expectedData: any): void => {
        expect(response.status).toEqual(statusCode);
        expect(response.config.url).toEqual(expectedUrl);
        expect(response.data).toEqual(expectedData);
    };
});
