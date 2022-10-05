import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {testApiCall} from "./apiTestHelper.test";
import {
    API_USER,
    API_USER_ALL,
    API_USER_FOLLOWER_REQUESTS,
    API_USER_FOLLOWERS,
    API_USER_FOLLOWING,
    API_USER_IMAGES,
    API_USER_RELEVANT,
    API_USER_SEARCH
} from "../../../util/endpoints";
import {mockMyProfile, mockUsers} from "../../../util/mockData/mockData";
import {UserApi} from "../userApi";

describe("UserApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";
    const mockUserNotFound = "User (id:1) not found";
    const mockUserBlocked = "User (id:1) is blocked";
    const mockPageable = {userId: 1, page: 1};

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
            testApiCall(mockAdapter, "onGet", `${API_USER_SEARCH}/test`, 200, mockUsers, UserApi.searchUsersByUsername, {
                username: "test",
                pageNumber: 1
            });
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

    describe("should fetch UserApi.getUserTweetImages", () => {
        const mockTweetImageResponse = [{tweetId: 1, imageId: 1, src: "test"}];

        it("[200] should get user tweet images Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_IMAGES}/1`, 200, mockTweetImageResponse, UserApi.getUserTweetImages, 1);
        });
    });

    describe("should fetch UserApi.getFollowers", () => {
        it("[200] should get followers Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWERS}/1`, 200, mockUsers, UserApi.getFollowers, mockPageable);
        });

        it("[400] should user blocked", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWERS}/1`, 400, mockUserBlocked, UserApi.getFollowers, mockPageable);
        });

        it("[404] should user nor found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWERS}/1`, 404, mockUserNotFound, UserApi.getFollowers, mockPageable);
        });
    });

    describe("should fetch UserApi.getFollowing", () => {
        it("[200] should get following Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWING}/1`, 200, mockUsers, UserApi.getFollowing, mockPageable);
        });

        it("[400] should user blocked", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWING}/1`, 400, mockUserBlocked, UserApi.getFollowing, mockPageable);
        });

        it("[404] should user nor found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWING}/1`, 404, mockUserNotFound, UserApi.getFollowing, mockPageable);
        });
    });

    describe("should fetch UserApi.getFollowerRequests", () => {
        it("[200] should get follower requests Success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_FOLLOWER_REQUESTS, 200, [{id: 1}], UserApi.getFollowerRequests, 1);
        });
    });
});
