import axios, {AxiosResponse} from "axios";
import MockAdapter from "axios-mock-adapter";

import {AuthUserResponse} from "../../../store/types/user";
import {AuthApi} from "../authApi";
import {LoginProps} from "../../../pages/Login/Login";
import {RegistrationInfo} from "../../../pages/Authentication/Authentication";
import {API_LOGIN, API_REGISTRATION_CHECK, API_REGISTRATION_CODE} from "../../../util/endpoints";

describe("AuthApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";

    beforeEach(() => mockAdapter.reset());

    describe("should fetch AuthApi.signIn", () => {
        const mockRequest = {email: "test@test.com", password: "test_password"} as LoginProps;
        const mockResponse = {user: {id: 1} as AuthUserResponse, token: "test_token"};
        const mockPasswordErrorResponse = "Incorrect password or email";

        it("[200] should Login Success", () => {
            mockAdapter.onPost(API_LOGIN, mockRequest).reply(200, mockResponse);
            AuthApi.signIn(mockRequest).then((response) => {
                testApiCall(200, response, API_LOGIN, mockResponse);
            });
        });

        it("[404] should User not found", () => {
            mockAdapter.onPost(API_LOGIN, mockRequest).reply(404, mockUserErrorResponse);
            AuthApi.signIn(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, API_LOGIN, mockUserErrorResponse);
                });
        });

        it("[403] Incorrect password or email", () => {
            mockAdapter.onPost(API_LOGIN, mockRequest).reply(403, mockPasswordErrorResponse);
            AuthApi.signIn(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(403, error.response, API_LOGIN, mockPasswordErrorResponse);
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
            mockAdapter.onPost(API_REGISTRATION_CHECK, mockRequest).reply(200, mockResponse);
            AuthApi.checkEmail(mockRequest).then((response) => {
                testApiCall(200, response, API_REGISTRATION_CHECK, mockResponse);
            });
        });

        it("[403] should return email error", () => {
            mockAdapter.onPost(API_REGISTRATION_CHECK, mockRequest).reply(403, mockErrorResponse);
            AuthApi.checkEmail(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(403, error.response, API_REGISTRATION_CHECK, mockErrorResponse);
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
            mockAdapter.onPost(API_REGISTRATION_CODE, mockRequest).reply(200, mockResponse);
            AuthApi.sendRegistrationCode(mockRequest).then((response) => {
                testApiCall(200, response, API_REGISTRATION_CODE, mockResponse);
            });
        });

        it("[404] should User not found", () => {
            mockAdapter.onPost(API_REGISTRATION_CODE, mockRequest).reply(404, mockUserErrorResponse);
            AuthApi.sendRegistrationCode(mockRequest).then((response) => response)
                .catch((error) => {
                    testApiCall(404, error.response, API_REGISTRATION_CODE, mockUserErrorResponse);
                });
        });
    });

    const testApiCall = (statusCode: number, response: AxiosResponse, expectedUrl: string, expectedData: any): void => {
        expect(response.status).toEqual(statusCode);
        expect(response.config.url).toEqual(expectedUrl);
        expect(response.data).toEqual(expectedData);
    };
});
