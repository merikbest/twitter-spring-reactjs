import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_USER,
    API_USER_ALL,
    API_USER_DETAILS,
    API_USER_PIN_TWEET,
    API_USER_RELEVANT,
    API_USER_SEARCH_RESULTS,
    API_USER_SEARCH_TEXT,
    API_USER_SEARCH_USERNAME,
    API_USER_START,
    API_USER_SUBSCRIBE,
    API_USER_TOKEN
} from "../../../../constants/endpoint-constants";
import { mockMyProfile, mockUser, mockUserDetailResponse, mockUsers } from "../../../../util/test-utils/mock-test-data";
import { UserApi } from "../userApi";

describe("UserApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";
    const mockTweetErrorResponse = "Tweet not found";
    const mockUserNotFound = "User (id:1) not found";
    const mockAuthUserResponse = { user: mockUser, token: "test_token" };

    beforeEach(() => mockAdapter.reset());

    describe("should fetch AuthApi.getMe", () => {
        it("[200] should get user success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_TOKEN, 200, mockAuthUserResponse, UserApi.getUserByToken);
        });

        it("[404] should User not found", () => {
            testApiCall(mockAdapter, "onGet", API_USER_TOKEN, 404, mockUserErrorResponse, UserApi.getUserByToken);
        });
    });

    describe("should fetch UserApi.getUserById", () => {
        it("[200] should get user info Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER}/1`, 200, mockMyProfile, UserApi.getUserById, 1);
        });

        it("[404] should User not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER}/1`, 404, mockUserErrorResponse, UserApi.getUserById, 1);
        });
    });

    describe("should fetch UserApi.getUsers", () => {
        it("[200] should get users Success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_ALL, 200, mockUsers, UserApi.getUsers, 1);
        });
    });

    describe("should fetch UserApi.getRelevantUsers", () => {
        it("[200] should get relevant users Success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_RELEVANT, 200, mockUsers, UserApi.getRelevantUsers, 1);
        });
    });

    describe("should fetch UserApi.searchUsersByUsername", () => {
        it("[200] should search users by username Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_SEARCH_USERNAME}/test`, 200, mockUsers, UserApi.searchUsersByUsername, {
                username: "test",
                pageNumber: 1
            });
        });
    });

    describe("should fetch UserApi.searchByText", () => {
        it("[200] should get search by text Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_SEARCH_TEXT}/test`, 200, {}, UserApi.searchByText, "test");
        });
    });

    describe("should fetch UserApi.getSearchResults", () => {
        it("[200] should get get search results Success", () => {
            testApiCall(mockAdapter, "onPost", API_USER_SEARCH_RESULTS, 200, mockUsers, UserApi.getSearchResults, { text: ["test"] });
        });
    });

    describe("should fetch UserApi.startUseTwitter", () => {
        it("[200] should start use twitter Success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_START, 200, true, UserApi.startUseTwitter);
        });
    });

    describe("should fetch UserApi.updateUserProfile", () => {
        const mockUserRequest = { username: "test", location: "test" };

        it("[200] should update user profile Success", () => {
            testApiCall(mockAdapter, "onPut", API_USER, 200, mockMyProfile, UserApi.updateUserProfile, mockUserRequest);
        });

        it("[404] should return Incorrect username length", () => {
            testApiCall(mockAdapter, "onPut", API_USER, 404, "Incorrect username length", UserApi.updateUserProfile, mockUserRequest);
        });
    });

    describe("should fetch UserApi.processSubscribeToNotifications", () => {
        it("[200] should process subscribe to notifications Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_SUBSCRIBE}/1`, 200, true, UserApi.processSubscribeToNotifications, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_SUBSCRIBE}/1`, 404, mockUserNotFound, UserApi.processSubscribeToNotifications, 1);
        });
    });

    describe("should fetch UserApi.pinTweet", () => {
        it("[200] should pin tweet Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_PIN_TWEET}/1`, 200, 1, UserApi.processPinTweet, 1);
        });

        it("[404] should tweet not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_PIN_TWEET}/1`, 404, mockTweetErrorResponse, UserApi.processPinTweet, 1);
        });
    });

    describe("should fetch UserApi.getUserDetails", () => {
        const cancelTokenSource = axios.CancelToken.source();

        it("[200] should get user details Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_DETAILS}/1`, 200, mockUserDetailResponse, UserApi.getUserDetails, 1, cancelTokenSource);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_DETAILS}/1`, 404, mockUserErrorResponse, UserApi.getUserDetails, 1, cancelTokenSource);
        });
    });
});
