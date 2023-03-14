import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { testApiCall } from "../../../util/test-utils/api-test-helper";
import {
    API_NOTIFICATION_SUBSCRIBES,
    API_NOTIFICATION_TIMELINE,
    API_NOTIFICATION_USER,
    API_USER,
    API_USER_ALL,
    API_USER_BLOCKED,
    API_USER_DETAILS,
    API_USER_FOLLOW,
    API_USER_FOLLOW_ACCEPT,
    API_USER_FOLLOW_DECLINE,
    API_USER_FOLLOW_PRIVATE,
    API_USER_FOLLOWER_REQUESTS,
    API_USER_FOLLOWERS,
    API_USER_FOLLOWING,
    API_USER_MUTED,
    API_USER_PIN_TWEET,
    API_USER_RELEVANT,
    API_USER_SEARCH,
    API_USER_START,
    API_USER_SUBSCRIBE
} from "../../../constants/endpoint-constants";
import {
    mockBlockedUsers,
    mockMutedUsers,
    mockMyProfile,
    mockTweets,
    mockUserDetailResponse,
    mockUsers
} from "../../../util/test-utils/mock-test-data";
import { UserApi } from "../userApi";

describe("UserApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";
    const mockTweetErrorResponse = "Tweet not found";
    const mockUserNotFound = "User (id:1) not found";
    const mockUserBlocked = "User (id:1) is blocked";
    const mockPageable = { userId: 1, page: 1 };

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
        const mockUserRequest = { username: "test", location: "test" };

        it("[200] should update user profile Success", () => {
            testApiCall(mockAdapter, "onPut", API_USER, 200, mockMyProfile, UserApi.updateUserProfile, mockUserRequest);
        });

        it("[404] should return Incorrect username length", () => {
            testApiCall(mockAdapter, "onPut", API_USER, 404, "Incorrect username length", UserApi.updateUserProfile, mockUserRequest);
        });
    });

    describe("should fetch UserApi.getFollowers", () => {
        it("[200] should get followers Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWERS}/1`, 200, mockUsers, UserApi.getFollowers, mockPageable);
        });

        it("[400] should user blocked", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWERS}/1`, 400, mockUserBlocked, UserApi.getFollowers, mockPageable);
        });

        it("[404] should user not found", () => {
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

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOWING}/1`, 404, mockUserNotFound, UserApi.getFollowing, mockPageable);
        });
    });

    describe("should fetch UserApi.getFollowerRequests", () => {
        it("[200] should get follower requests Success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_FOLLOWER_REQUESTS, 200, [{ id: 1 }], UserApi.getFollowerRequests, 1);
        });
    });

    describe("should fetch UserApi.follow", () => {
        it("[200] should follow Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW}/1`, 200, [{ id: 1 }], UserApi.follow, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW}/1`, 404, mockUserNotFound, UserApi.follow, 1);
        });
    });

    describe("should fetch UserApi.processFollowRequestToPrivateProfile", () => {
        it("[200] should process follow request to private profile Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_PRIVATE}/1`, 200, mockMyProfile, UserApi.processFollowRequestToPrivateProfile, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_PRIVATE}/1`, 404, mockUserNotFound, UserApi.processFollowRequestToPrivateProfile, 1);
        });
    });

    describe("should fetch UserApi.acceptFollowRequest", () => {
        it("[200] should accept followRequest Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_ACCEPT}/1`, 200, "User (id:1) accepted.", UserApi.acceptFollowRequest, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_ACCEPT}/1`, 404, mockUserNotFound, UserApi.acceptFollowRequest, 1);
        });
    });

    describe("should fetch UserApi.declineFollowRequest", () => {
        it("[200] should decline followRequest Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_DECLINE}/1`, 200, "User (id:1) declined.", UserApi.declineFollowRequest, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_FOLLOW_DECLINE}/1`, 404, mockUserNotFound, UserApi.declineFollowRequest, 1);
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

    describe("should fetch UserApi.getUserNotifications", () => {
        it("[200] should get user notifications Success", () => {
            testApiCall(mockAdapter, "onGet", API_NOTIFICATION_USER, 200, [{ id: 1 }], UserApi.getUserNotifications, 1);
        });
    });

    describe("should fetch UserApi.getTweetAuthorsNotifications", () => {
        it("[200] should get tweet authors notifications Success", () => {
            testApiCall(mockAdapter, "onGet", API_NOTIFICATION_SUBSCRIBES, 200, [{ id: 1 }], UserApi.getTweetAuthorsNotifications);
        });
    });

    describe("should fetch UserApi.getUserNotificationById", () => {
        it("[200] should get user notification by id Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_NOTIFICATION_USER}/1`, 200, [{ id: 1 }], UserApi.getUserNotificationById, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_NOTIFICATION_USER}/1`, 404, "Notification not found", UserApi.getUserNotificationById, 1);
        });
    });

    describe("should fetch UserApi.getNotificationsFromTweetAuthors", () => {
        it("[200] should get notifications from tweet authors Success", () => {
            testApiCall(mockAdapter, "onGet", API_NOTIFICATION_TIMELINE, 200, mockTweets, UserApi.getNotificationsFromTweetAuthors, 1);
        });
    });

    describe("should fetch UserApi.startUseTwitter", () => {
        it("[200] should start use twitter Success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_START(1), 200, true, UserApi.startUseTwitter, 1);
        });
    });

    describe("should fetch UserApi.pinTweet", () => {
        it("[200] should pin tweet Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_PIN_TWEET}/1`, 200, 1, UserApi.pinTweet, 1);
        });

        it("[404] should tweet not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_PIN_TWEET}/1`, 404, mockTweetErrorResponse, UserApi.pinTweet, 1);
        });
    });

    describe("should fetch UserApi.getBlockList", () => {
        it("[200] should get block list Success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_BLOCKED, 200, mockBlockedUsers, UserApi.getBlockList, 1);
        });
    });

    describe("should fetch UserApi.getMutedList", () => {
        it("[200] should get muted list Success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_MUTED, 200, mockMutedUsers, UserApi.getMutedList, 1);
        });
    });

    describe("should fetch UserApi.processBlockList", () => {
        it("[200] should process block list Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_BLOCKED}/1`, 200, true, UserApi.processBlockList, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_BLOCKED}/1`, 404, mockUserErrorResponse, UserApi.processBlockList, 1);
        });
    });

    describe("should fetch UserApi.processMutedList", () => {
        it("[200] should process muted list Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_MUTED}/1`, 200, true, UserApi.processMutedList, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_MUTED}/1`, 404, mockUserErrorResponse, UserApi.processMutedList, 1);
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
