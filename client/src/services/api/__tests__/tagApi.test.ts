import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {testApiCall} from "../../../util/apiTestHelper";
import {API_TAGS, API_TAGS_SEARCH, API_TAGS_TRENDS} from "../../../util/endpoints";
import {mockTags, mockTweets} from "../../../util/mockData/mockData";
import {TagApi} from "../tagApi";

describe("TagApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch TagApi.fetchTags", () => {
        it("[200] should fetch tags Success", () => {
            testApiCall(mockAdapter, "onGet", API_TAGS, 200, mockTags, TagApi.fetchTags);
        });
    });

    describe("should fetch TagApi.fetchTrends", () => {
        it("[200] should fetch trends Success", () => {
            testApiCall(mockAdapter, "onGet", API_TAGS_TRENDS, 200, mockTags, TagApi.fetchTrends, 1);
        });
    });

    describe("should fetch TagApi.fetchTweetsByTag", () => {
        it("[200] should fetch tweets by tag Success", () => {
            testApiCall(mockAdapter, "onGet", API_TAGS_SEARCH, 200, mockTweets, TagApi.fetchTweetsByTag, "test");
        });
    });
});
