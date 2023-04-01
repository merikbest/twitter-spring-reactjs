import { AxiosResponse } from "axios";
import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { TopicApi } from "../../../../services/api/topic-service/topicApi";
import {
    fetchFollowedTopicsByUserId,
    fetchTopicsByCategories,
    fetchTopicsByIds,
    processFollowTopic,
    processNotInterestedTopic,
    setFollowedTopics,
    setFollowedTopicsLoadingState,
    setFollowTopic,
    setNotInterestedTopic,
    setTopics,
    setTopicsByCategories,
    setTopicsByCategoriesLoadingState,
    setTopicsLoadingState
} from "../actionCreators";
import { TopicResponse } from "../../../../types/topic";
import {
    fetchFollowedTopicsByUserIdRequest,
    fetchFollowedTopicsRequest,
    fetchNotInterestedTopicsRequest,
    fetchTopicsByCategoriesRequest,
    fetchTopicsByIdsRequest,
    processFollowTopicRequest,
    processNotInterestedTopicRequest,
    topicsSaga
} from "../sagas";
import { TopicsActionsType } from "../contracts/actionTypes";

describe("topicsSaga:", () => {
    const mockTopics = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<TopicResponse[]>;

    describe("fetchTopicsByIdsRequest:", () => {
        const worker = fetchTopicsByIdsRequest(fetchTopicsByIds({ topicsIds: [1, 2, 3] }));
        testLoadingStatus(worker, setTopicsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TopicApi.getTopicsByIds, { topicsIds: [1, 2, 3] });
        testSetResponse(worker, mockTopics, setTopics, mockTopics.data, "TopicResponse");
        testLoadingStatus(worker, setTopicsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTopicsByCategoriesRequest:", () => {
        const worker = fetchTopicsByCategoriesRequest(fetchTopicsByCategories({ categories: ["GAMES"] }));
        testLoadingStatus(worker, setTopicsByCategoriesLoadingState, LoadingStatus.LOADING);
        testCall(worker, TopicApi.getTopicsByCategories, { categories: ["GAMES"] });
        testSetResponse(worker, mockTopics, setTopicsByCategories, mockTopics.data, "TopicResponse");
        testLoadingStatus(worker, setTopicsByCategoriesLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchNotInterestedTopicsRequest:", () => {
        const worker = fetchNotInterestedTopicsRequest();
        testLoadingStatus(worker, setTopicsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TopicApi.getNotInterestedTopics);
        testSetResponse(worker, mockTopics, setTopics, mockTopics.data, "TopicResponse");
        testLoadingStatus(worker, setTopicsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchFollowedTopicsRequest:", () => {
        const worker = fetchFollowedTopicsRequest();
        testLoadingStatus(worker, setFollowedTopicsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TopicApi.getFollowedTopics);
        testSetResponse(worker, mockTopics, setFollowedTopics, mockTopics.data, "TopicResponse");
        testLoadingStatus(worker, setFollowedTopicsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchFollowedTopicsByUserIdRequest:", () => {
        const worker = fetchFollowedTopicsByUserIdRequest(fetchFollowedTopicsByUserId(2));
        testLoadingStatus(worker, setFollowedTopicsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TopicApi.getFollowedTopicsByUserId, 2);
        testSetResponse(worker, mockTopics, setFollowedTopics, mockTopics.data, "TopicResponse");
        testLoadingStatus(worker, setFollowedTopicsLoadingState, LoadingStatus.ERROR);
    });

    describe("processNotInterestedTopicRequest:", () => {
        const worker = processNotInterestedTopicRequest(processNotInterestedTopic(2));
        testCall(worker, TopicApi.processNotInterestedTopic, 2);
        testSetResponse(worker, true, setNotInterestedTopic, {
            topicsId: 2,
            isTopicNotInterested: undefined
        }, "TopicResponse");
        testLoadingStatus(worker, setTopicsLoadingState, LoadingStatus.ERROR);
    });

    describe("processFollowTopicRequest:", () => {
        const worker = processFollowTopicRequest(processFollowTopic({ topicsId: 2 }));
        testCall(worker, TopicApi.processFollowTopic, 2);
        testSetResponse(worker, true, setFollowTopic, { topicsId: 2, isTopicFollowed: undefined }, "TopicResponse");
        testLoadingStatus(worker, setTopicsLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(topicsSaga, [
        { actionType: TopicsActionsType.FETCH_TOPICS_BY_IDS, workSaga: fetchTopicsByIdsRequest },
        { actionType: TopicsActionsType.FETCH_TOPICS_BY_CATEGORIES, workSaga: fetchTopicsByCategoriesRequest },
        { actionType: TopicsActionsType.FETCH_NOT_INTERESTED_TOPICS, workSaga: fetchNotInterestedTopicsRequest },
        { actionType: TopicsActionsType.FETCH_FOLLOWED_TOPICS, workSaga: fetchFollowedTopicsRequest },
        {
            actionType: TopicsActionsType.FETCH_FOLLOWED_TOPICS_BY_USER_ID,
            workSaga: fetchFollowedTopicsByUserIdRequest
        },
        { actionType: TopicsActionsType.PROCESS_NOT_INTERESTED_TOPIC, workSaga: processNotInterestedTopicRequest },
        { actionType: TopicsActionsType.PROCESS_FOLLOW_TOPIC, workSaga: processFollowTopicRequest }
    ]);
});
