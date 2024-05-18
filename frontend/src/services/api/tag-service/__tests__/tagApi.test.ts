import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { UI_V1_TAGS, UI_V1_TAGS_SEARCH, UI_V1_TAGS_TRENDS } from "../../../../constants/endpoint-constants";
import { mockTags, mockTweets } from "../../../../util/test-utils/mock-test-data";
import { TagApi } from "../tagApi";

describe("TagApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch TagApi.fetchTags", () => {
        it("[200] should fetch tags Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_TAGS, 200, mockTags, TagApi.getTags);
        });
    });

    describe("should fetch TagApi.fetchTrends", () => {
        it("[200] should fetch trends Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_TAGS_TRENDS, 200, mockTags, TagApi.getTrends, 1);
        });
    });

    describe("should fetch TagApi.fetchTweetsByTag", () => {
        it("[200] should fetch tweets by tag Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_TAGS_SEARCH, 200, mockTweets, TagApi.getTweetsByTag, "test");
        });
    });
});
