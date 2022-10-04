import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {testApiCall} from "./apiTestHelper.test";
import {API_USER, API_USER_ALL, API_USER_RELEVANT, API_USER_SEARCH} from "../../../util/endpoints";
import {mockMyProfile, mockUsers} from "../../../util/mockData/mockData";
import {UserApi} from "../userApi";

describe("UserApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";

    beforeEach(() => mockAdapter.reset());

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
            testApiCall(mockAdapter, "onGet", `${API_USER_SEARCH}/test`, 200, mockUsers, UserApi.searchUsersByUsername, {username: "test", pageNumber: 1});
        });
    });

    describe("should fetch UserApi.getUserInfo", () => {
        it("[200] should get user info Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER}/1`, 200, mockMyProfile, UserApi.getUserInfo, 1);
        });

        it("[404] should User not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER}/1`, 404, mockUserErrorResponse, UserApi.getUserInfo, 1);
        });
    });

    describe("should fetch UserApi.updateUserProfile", () => {
        const mockUserRequest = {username: "test", location: "test"};

        it("[200] should update user profile Success", () => {
            testApiCall(mockAdapter, "onPut", API_USER, 200, mockMyProfile, UserApi.updateUserProfile, mockUserRequest);
        });

        it("[404] should return Incorrect username length", () => {
            testApiCall(mockAdapter, "onPut", API_USER, 404, "Incorrect username length", UserApi.updateUserProfile, mockUserRequest);
        });
    });
});
