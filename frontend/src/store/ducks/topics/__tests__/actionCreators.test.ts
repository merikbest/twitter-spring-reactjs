import { testAction } from "../../../../util/test-utils/test-helper";
import { TopicsActionsType } from "../contracts/actionTypes";
import { FollowedTopicPayload, NotInterestedTopicPayload, TopicActionPayload, TopicsState } from "../contracts/state";
import {
    fetchFollowedTopics,
    fetchFollowedTopicsByUserId,
    fetchNotInterestedTopics,
    fetchTopicsByCategories,
    fetchTopicsByIds,
    processFollowTopic,
    processNotInterestedTopic,
    resetTopicsState,
    setFollowedTopics,
    setFollowedTopicsLoadingState,
    setFollowTopic,
    setNotInterestedTopic,
    setTopics,
    setTopicsByCategories,
    setTopicsByCategoriesLoadingState,
    setTopicsLoadingState
} from "../actionCreators";
import { LoadingStatus } from "../../../../types/common";

describe("topics actions", () => {

    testAction(setTopics, setTopics([{ id: 1 }] as TopicsState["topics"]), {
        type: TopicsActionsType.SET_TOPICS,
        payload: [{ id: 1 }] as TopicsState["topics"]
    });

    testAction(fetchTopicsByIds, fetchTopicsByIds({ topicsIds: [1, 2, 3] }), {
        type: TopicsActionsType.FETCH_TOPICS_BY_IDS,
        payload: { topicsIds: [1, 2, 3] }
    });

    testAction(setTopicsByCategories, setTopicsByCategories([{}] as TopicsState["topicsByCategories"]), {
        type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES,
        payload: [{}] as TopicsState["topicsByCategories"]
    });

    testAction(fetchTopicsByCategories, fetchTopicsByCategories({ categories: ["GAME"] }), {
        type: TopicsActionsType.FETCH_TOPICS_BY_CATEGORIES,
        payload: { categories: ["GAME"] }
    });

    testAction(fetchNotInterestedTopics, fetchNotInterestedTopics(), {
        type: TopicsActionsType.FETCH_NOT_INTERESTED_TOPICS
    });

    testAction(fetchFollowedTopics, fetchFollowedTopics(), {
        type: TopicsActionsType.FETCH_FOLLOWED_TOPICS
    });

    testAction(fetchFollowedTopicsByUserId, fetchFollowedTopicsByUserId(1), {
        type: TopicsActionsType.FETCH_FOLLOWED_TOPICS_BY_USER_ID,
        payload: 1
    });

    testAction(setFollowedTopics, setFollowedTopics([{ id: 1 }] as TopicsState["followedTopics"]), {
        type: TopicsActionsType.SET_FOLLOWED_TOPICS,
        payload: [{ id: 1 }] as TopicsState["followedTopics"]
    });

    testAction(processNotInterestedTopic, processNotInterestedTopic(1), {
        type: TopicsActionsType.PROCESS_NOT_INTERESTED_TOPIC,
        payload: 1
    });

    testAction(setNotInterestedTopic, setNotInterestedTopic({} as NotInterestedTopicPayload), {
        type: TopicsActionsType.SET_NOT_INTERESTED_TOPIC,
        payload: {} as NotInterestedTopicPayload
    });

    testAction(processFollowTopic, processFollowTopic({ topicsId: 1 } as TopicActionPayload), {
        type: TopicsActionsType.PROCESS_FOLLOW_TOPIC,
        payload: { topicsId: 1 } as TopicActionPayload
    });

    testAction(setFollowTopic, setFollowTopic({} as FollowedTopicPayload), {
        type: TopicsActionsType.SET_FOLLOW_TOPIC,
        payload: {} as FollowedTopicPayload
    });

    testAction(resetTopicsState, resetTopicsState(), {
        type: TopicsActionsType.RESET_TOPICS_STATE
    });

    testAction(setTopicsLoadingState, setTopicsLoadingState(LoadingStatus.LOADING), {
        type: TopicsActionsType.SET_TOPICS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(setTopicsByCategoriesLoadingState, setTopicsByCategoriesLoadingState(LoadingStatus.LOADING), {
        type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(setFollowedTopicsLoadingState, setFollowedTopicsLoadingState(LoadingStatus.LOADING), {
        type: TopicsActionsType.SET_FOLLOWED_TOPICS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
