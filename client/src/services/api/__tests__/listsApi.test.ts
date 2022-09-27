import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {testApiCall} from "./apiTestHelper.test";
import {API_LISTS, API_LISTS_PINNED, API_LISTS_USER, API_LISTS_USER_CONSIST} from "../../../util/endpoints";
import {mockFullList, mockLists, mockPinnedLists, mockUserLists} from "../../../util/mockData/mockData";
import {ListsApi} from "../listsApi";

describe("ListsApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockListNotFound = "List not found";
    const mockListError = "Incorrect list name length";

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
        const mockRequest = {name: "test list", isPrivate: true};

        it("[200] should create tweet list Success", () => {
            testApiCall(mockAdapter, "onPost", API_LISTS, 200, mockUserLists[0], ListsApi.createTweetList, mockRequest);
        });

        it("[400] should create tweet list bad request", () => {
            testApiCall(mockAdapter, "onPost", API_LISTS, 400, mockListError, ListsApi.createTweetList, mockRequest);
        });
    });

    describe("should fetch ListsApi.editList", () => {
        const mockRequest = {id: 1, name: "test list", isPrivate: true};

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

});
