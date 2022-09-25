import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {testApiCall} from "./apiTestHelper.test";
import {API_LISTS, API_LISTS_PINNED, API_LISTS_USER, API_LISTS_USER_CONSIST} from "../../../util/endpoints";
import {mockLists, mockPinnedLists, mockUserLists} from "../../../util/mockData/mockData";
import {ListsApi} from "../listsApi";

describe("ListsApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch ListsApi.getAllTweetLists", () => {
        it("[200] should get all tweet lists Success", () => {
            testApiCall(mockAdapter, "get", API_LISTS, 200, mockLists, ListsApi.getAllTweetLists);
        });
    });

    describe("should fetch ListsApi.getUserTweetLists", () => {
        it("[200] should get user tweet lists Success", () => {
            testApiCall(mockAdapter, "get", API_LISTS_USER, 200, mockUserLists, ListsApi.getUserTweetLists);
        });
    });

    describe("should fetch ListsApi.getUserTweetListsById", () => {
        it("[200] should get user tweet lists by id Success", () => {
            testApiCall(mockAdapter, "get", `${API_LISTS_USER}/1`, 200, mockLists, ListsApi.getUserTweetListsById, 1);
        });
    });

    describe("should fetch ListsApi.getTweetListsWhichUserIn", () => {
        it("[200] should get tweet lists which user in Success", () => {
            testApiCall(mockAdapter, "get", API_LISTS_USER_CONSIST, 200, mockLists, ListsApi.getTweetListsWhichUserIn);
        });
    });

    describe("should fetch ListsApi.getUserPinnedLists", () => {
        it("[200] should get user pinned lists Success", () => {
            testApiCall(mockAdapter, "get", API_LISTS_PINNED, 200, mockPinnedLists, ListsApi.getUserPinnedLists);
        });
    });

});
