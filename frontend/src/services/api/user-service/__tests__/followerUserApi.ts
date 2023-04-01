import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_USER_FOLLOW,
    API_USER_FOLLOW_ACCEPT,
    API_USER_FOLLOW_DECLINE,
    API_USER_FOLLOW_PRIVATE,
    API_USER_FOLLOWER_REQUESTS,
    API_USER_FOLLOWERS,
    API_USER_FOLLOWING
} from "../../../../constants/endpoint-constants";
import { mockMyProfile, mockUsers } from "../../../../util/test-utils/mock-test-data";
import { FollowerUserApi } from "../followerUserApi";

describe("FollowerUserApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserNotFound = "User (id:1) not found";
    const mockUserBlocked = "User (id:1) is blocked";
    const mockPageable = { userId: 1, page: 1 };

    beforeEach(() => mockAdapter.reset());

    describe("should fetch FollowerUserApi.getFollowers", () => {
        it("[200] should get followers Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWERS}/1`, 200, mockUsers, FollowerUserApi.getFollowers, mockPageable);
        });

        it("[400] should user blocked", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWERS}/1`, 400, mockUserBlocked, FollowerUserApi.getFollowers, mockPageable);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWERS}/1`, 404, mockUserNotFound, FollowerUserApi.getFollowers, mockPageable);
        });
    });

    describe("should fetch FollowerUserApi.getFollowing", () => {
        it("[200] should get following Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWING}/1`, 200, mockUsers, FollowerUserApi.getFollowing, mockPageable);
        });

        it("[400] should user blocked", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWING}/1`, 400, mockUserBlocked, FollowerUserApi.getFollowing, mockPageable);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWING}/1`, 404, mockUserNotFound, FollowerUserApi.getFollowing, mockPageable);
        });
    });

    describe("should fetch FollowerUserApi.getFollowerRequests", () => {
        it("[200] should get follower requests Success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_FOLLOWER_REQUESTS, 200, [{ id: 1 }], FollowerUserApi.getFollowerRequests, 1);
        });
    });

    describe("should fetch FollowerUserApi.processFollow", () => {
        it("[200] should follow Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW}/1`, 200, [{ id: 1 }], FollowerUserApi.processFollow, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW}/1`, 404, mockUserNotFound, FollowerUserApi.processFollow, 1);
        });
    });

    describe("should fetch FollowerUserApi.processFollowRequestToPrivateProfile", () => {
        it("[200] should process follow request to private profile Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_PRIVATE}/1`, 200, mockMyProfile, FollowerUserApi.processFollowRequestToPrivateProfile, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_PRIVATE}/1`, 404, mockUserNotFound, FollowerUserApi.processFollowRequestToPrivateProfile, 1);
        });
    });

    describe("should fetch FollowerUserApi.acceptFollowRequest", () => {
        it("[200] should accept followRequest Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_ACCEPT}/1`, 200, "User (id:1) accepted.", FollowerUserApi.acceptFollowRequest, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_ACCEPT}/1`, 404, mockUserNotFound, FollowerUserApi.acceptFollowRequest, 1);
        });
    });

    describe("should fetch FollowerUserApi.declineFollowRequest", () => {
        it("[200] should decline followRequest Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_DECLINE}/1`, 200, "User (id:1) declined.", FollowerUserApi.declineFollowRequest, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_DECLINE}/1`, 404, mockUserNotFound, FollowerUserApi.declineFollowRequest, 1);
        });
    });
});
