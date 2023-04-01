import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_LISTS,
    API_LISTS_ADD_USER,
    API_LISTS_DETAILS,
    API_LISTS_FOLLOW,
    API_LISTS_FOLLOWERS,
    API_LISTS_MEMBERS,
    API_LISTS_PIN,
    API_LISTS_PINNED,
    API_LISTS_SEARCH,
    API_LISTS_TWEETS,
    API_LISTS_USER,
    API_LISTS_USER_CONSIST
} from "../../../../constants/endpoint-constants";
import {
    mockFullList,
    mockLists,
    mockListsOwnerMember,
    mockPinnedLists,
    mockSimpleList,
    mockTweets,
    mockUserLists
} from "../../../../util/test-utils/mock-test-data";
import { ListsApi } from "../listsApi";

describe("ListsApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockListNotFound = "List not found";
    const mockListError = "Incorrect list name length";
    const mockUserBLocked = "User with ID:1 is blocked";

    beforeEach(() => mockAdapter.reset());

    describe("should fetch ListsApi.getAllTweetLists", () => {
        it("[200] should get all tweet lists Success", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS, 200, mockLists, ListsApi.getAllTweetLists);
        });
    });

    describe("should fetch ListsApi.getUserTweetLists", () => {
        it("[200] should get user tweet lists Success", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_USER, 200, mockUserLists, ListsApi.getUserTweetLists);
        });
    });

    describe("should fetch ListsApi.getUserTweetListsById", () => {
        it("[200] should get user tweet lists by id Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS_USER}/1`, 200, mockLists, ListsApi.getUserTweetListsById, 1);
        });
    });

    describe("should fetch ListsApi.getTweetListsWhichUserIn", () => {
        it("[200] should get tweet lists which user in Success", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_USER_CONSIST, 200, mockLists, ListsApi.getTweetListsWhichUserIn);
        });
    });

    describe("should fetch ListsApi.getUserPinnedLists", () => {
        it("[200] should get user pinned lists Success", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_PINNED, 200, mockPinnedLists, ListsApi.getUserPinnedLists);
        });
    });

    describe("should fetch ListsApi.getListById", () => {
        it("[200] should get list by id Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS}/1`, 200, mockFullList, ListsApi.getListById, 1);
        });

        it("[404] should list not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS}/1`, 404, mockListNotFound, ListsApi.getListById, 1);
        });
    });

    describe("should fetch ListsApi.createTweetList", () => {
        const mockRequest = { name: "test list", isPrivate: true };

        it("[200] should create tweet list Success", () => {
            testApiCall(mockAdapter, "onPost", API_LISTS, 200, mockUserLists[0], ListsApi.createTweetList, mockRequest);
        });

        it("[400] should create tweet list bad request", () => {
            testApiCall(mockAdapter, "onPost", API_LISTS, 400, mockListError, ListsApi.createTweetList, mockRequest);
        });
    });

    describe("should fetch ListsApi.editList", () => {
        const mockRequest = { id: 1, name: "test list", isPrivate: true };

        it("[200] should edit list Success", () => {
            testApiCall(mockAdapter, "onPut", API_LISTS, 200, mockFullList, ListsApi.editList, mockRequest);
        });

        it("[400] should edit list bad request", () => {
            testApiCall(mockAdapter, "onPut", API_LISTS, 400, mockListError, ListsApi.editList, mockRequest);
        });

        it("[404] should edit list not found", () => {
            testApiCall(mockAdapter, "onPut", API_LISTS, 404, mockListNotFound, ListsApi.editList, mockRequest);
        });
    });

    describe("should fetch ListsApi.deleteList", () => {
        it("[200] should delete list Success", () => {
            testApiCall(mockAdapter, "onDelete", `${API_LISTS}/1`, 200, "List id:1 deleted.", ListsApi.deleteList, 1);
        });

        it("[400] should delete list bad request", () => {
            testApiCall(mockAdapter, "onDelete", `${API_LISTS}/1`, 400, mockListError, ListsApi.deleteList, 1);
        });

        it("[404] should delete list not found", () => {
            testApiCall(mockAdapter, "onDelete", `${API_LISTS}/1`, 404, mockListNotFound, ListsApi.deleteList, 1);
        });
    });

    describe("should fetch ListsApi.followList", () => {
        it("[200] should follow List Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS_FOLLOW}/1`, 200, mockUserLists[0], ListsApi.followList, 1);
        });

        it("[404] should follow list not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS_FOLLOW}/1`, 404, mockListNotFound, ListsApi.followList, 1);
        });
    });

    describe("should fetch ListsApi.pinList", () => {
        it("[200] should pin List Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS_PIN}/1`, 200, mockPinnedLists[0], ListsApi.pinList, 1);
        });

        it("[404] should pin List not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS_PIN}/1`, 404, mockListNotFound, ListsApi.pinList, 1);
        });
    });

    describe("should fetch ListsApi.getListsToAddUser", () => {
        it("[200] should get lists to add user Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS_ADD_USER}/1`, 200, mockSimpleList[0], ListsApi.getListsToAddUser, 1);
        });
    });

    describe("should fetch ListsApi.addUserToLists", () => {
        const mockAddUserRequest = { userId: 1, lists: [{ listId: 1, isMemberInList: true }] };

        it("[200] should add user to lists Success", () => {
            testApiCall(mockAdapter, "onPost", API_LISTS_ADD_USER, 200, "User added to lists success.", ListsApi.addUserToLists, mockAddUserRequest);
        });

        it("[404] should list not found", () => {
            testApiCall(mockAdapter, "onPost", API_LISTS_ADD_USER, 404, mockListNotFound, ListsApi.addUserToLists, mockAddUserRequest);
        });

        it("[400] should user is blocked", () => {
            testApiCall(mockAdapter, "onPost", API_LISTS_ADD_USER, 400, mockUserBLocked, ListsApi.addUserToLists, mockAddUserRequest);
        });
    });

    describe("should fetch ListsApi.addUserToList", () => {
        it("[200] should add user to list Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS_ADD_USER}/1/1`, 200, true, ListsApi.addUserToList, 1, 1);
        });

        it("[404] should list not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS_ADD_USER}/1/1`, 404, mockListNotFound, ListsApi.addUserToList, 1, 1);
        });

        it("[400] should user is blocked", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS_ADD_USER}/1/1`, 400, mockUserBLocked, ListsApi.addUserToList, 1, 1);
        });
    });

    describe("should fetch ListsApi.getTweetsByListId", () => {
        it("[200] should get tweets by list id Success", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_TWEETS(1), 200, mockTweets, ListsApi.getTweetsByListId, 1, 1);
        });

        it("[404] should list not found", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_TWEETS(1), 404, mockListNotFound, ListsApi.getTweetsByListId, 1, 1);
        });
    });

    describe("should fetch ListsApi.getListDetails", () => {
        const cancelTokenSource = axios.CancelToken.source();

        it("[200] should get list details Success", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_DETAILS(1), 200, mockTweets, ListsApi.getListDetails, 1, cancelTokenSource);
        });

        it("[404] should list not found", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_DETAILS(1), 404, mockListNotFound, ListsApi.getListDetails, 1, cancelTokenSource);
        });
    });

    describe("should fetch ListsApi.getListFollowers", () => {
        it("[200] should get list followers Success", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_FOLLOWERS(1, 1), 200, mockListsOwnerMember, ListsApi.getListFollowers, 1, 1);
        });

        it("[404] should list not found", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_FOLLOWERS(1, 1), 404, mockListNotFound, ListsApi.getListFollowers, 1, 1);
        });

        it("[400] should user is blocked", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_FOLLOWERS(1, 1), 400, mockUserBLocked, ListsApi.getListFollowers, 1, 1);
        });
    });

    describe("should fetch ListsApi.getListMembers", () => {
        it("[200] should get list members Success", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_MEMBERS(1, 1), 200, mockListsOwnerMember, ListsApi.getListMembers, 1, 1);
        });

        it("[404] should list not found", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_MEMBERS(1, 1), 404, mockListNotFound, ListsApi.getListMembers, 1, 1);
        });

        it("[400] should user is blocked", () => {
            testApiCall(mockAdapter, "onGet", API_LISTS_MEMBERS(1, 1), 400, mockUserBLocked, ListsApi.getListMembers, 1, 1);
        });
    });

    describe("should fetch ListsApi.searchListMembersByUsername", () => {
        it("[200] should search list members by username Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_LISTS_SEARCH}/1/test`, 200, mockListsOwnerMember, ListsApi.searchListMembersByUsername, 1, "test");
        });
    });
});
