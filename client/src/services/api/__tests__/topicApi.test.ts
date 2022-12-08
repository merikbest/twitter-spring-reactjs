import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {testApiCall} from "../../../util/apiTestHelper";
import {API_TOPICS, API_TOPICS_FOLLOW, API_TOPICS_NOT_INTERESTED} from "../../../util/endpoints";
import {mockTopics} from "../../../util/mockData/mockData";
import {TopicApi} from "../topicApi";

describe("TopicApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch TopicApi.getTopics", () => {
        it("[200] should get topics Success", () => {
            testApiCall(mockAdapter, "onGet", API_TOPICS, 200, mockTopics, TopicApi.getTopics);
        });
    });

    describe("should fetch TopicApi.getTopicsByCategory", () => {
        it("[200] should get topics by category Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TOPICS}/entertainment`, 200, mockTopics, TopicApi.getTopicsByCategory, "entertainment");
        });
    });

    describe("should fetch TopicApi.getNotInterestedTopics", () => {
        it("[200] should get not interested topics Success", () => {
            testApiCall(mockAdapter, "onGet", API_TOPICS_NOT_INTERESTED, 200, mockTopics, TopicApi.getNotInterestedTopics);
        });
    });

    describe("should fetch TopicApi.addNotInterestedTopic", () => {
        it("[200] should add not interested topic Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TOPICS_NOT_INTERESTED}/1`, 200, true, TopicApi.addNotInterestedTopic, 1);
        });

        it("[404] should topic not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TOPICS_NOT_INTERESTED}/1`, 404, "Topic not found", TopicApi.addNotInterestedTopic, 1);
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
