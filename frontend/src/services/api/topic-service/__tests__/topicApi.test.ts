import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_TOPICS_CATEGORY,
    API_TOPICS_FOLLOW,
    API_TOPICS_FOLLOWED,
    API_TOPICS_NOT_INTERESTED,
    API_TOPICS_SUGGESTED
} from "../../../../constants/endpoint-constants";
import { mockTopics } from "../../../../util/test-utils/mock-test-data";
import { TopicApi } from "../topicApi";

describe("TopicApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch TopicApi.getTopicsByIds", () => {
        it("[200] should get topics by ids Success", () => {
            testApiCall(mockAdapter, "onPost", API_TOPICS_SUGGESTED, 200, mockTopics, TopicApi.getTopicsByIds, { topicIds: [1, 2, 3] });
        });
    });

    describe("should fetch TopicApi.getTopicsByCategories", () => {
        it("[200] should get topics by categories Success", () => {
            testApiCall(mockAdapter, "onPost", API_TOPICS_CATEGORY, 200, mockTopics, TopicApi.getTopicsByCategories, { categories: ["GAMING"] });
        });
    });

    describe("should fetch TopicApi.getFollowedTopics", () => {
        it("[200] should get followed topics Success", () => {
            testApiCall(mockAdapter, "onGet", API_TOPICS_FOLLOWED, 200, mockTopics, TopicApi.getFollowedTopics);
        });
    });

    describe("should fetch TopicApi.getFollowedTopicsByUserId", () => {
        it("[200] should get followed topics by user id Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TOPICS_FOLLOWED}/1`, 200, mockTopics, TopicApi.getFollowedTopicsByUserId, 1);
        });
    });

    describe("should fetch TopicApi.getNotInterestedTopics", () => {
        it("[200] should get not interested topics Success", () => {
            testApiCall(mockAdapter, "onGet", API_TOPICS_NOT_INTERESTED, 200, mockTopics, TopicApi.getNotInterestedTopics);
        });
    });

    describe("should fetch TopicApi.processNotInterestedTopic", () => {
        it("[200] should process not interested topic Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TOPICS_NOT_INTERESTED}/1`, 200, true, TopicApi.processNotInterestedTopic, 1);
        });

        it("[404] should topic not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TOPICS_NOT_INTERESTED}/1`, 404, "Topic not found", TopicApi.processNotInterestedTopic, 1);
        });
    });

    describe("should fetch TopicApi.processFollowTopic", () => {
        it("[200] should process Follow Topic Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TOPICS_FOLLOW}/1`, 200, true, TopicApi.processFollowTopic, 1);
        });

        it("[404] should topic not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TOPICS_FOLLOW}/1`, 404, "Topic not found", TopicApi.processFollowTopic, 1);
        });
    });
});
