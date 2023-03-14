import { initialTopicsState, topicsReducer } from "../reducer";
import { TopicsActions, TopicsActionsType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { TopicsState } from "../contracts/state";
import { TopicCategory } from "../../../../types/topic";

describe("topicsReducer:", () => {

    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(topicsReducer(undefined, {} as TopicsActions)).toEqual(initialTopicsState);
        });
    });

    describe("topics handlers:", () => {
        testActionDispatch(
            TopicsActionsType.SET_TOPICS,
            topicsReducer(initialTopicsState, {
                type: TopicsActionsType.SET_TOPICS,
                payload: [{ id: 1 }] as TopicsState["topics"]
            }),
            {
                ...initialTopicsState,
                topics: [{ id: 1 }] as TopicsState["topics"],
                topicsLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TopicsActionsType.SET_TOPICS_BY_CATEGORIES,
            topicsReducer(initialTopicsState, {
                type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES,
                payload: [] as TopicsState["topicsByCategories"]
            }),
            {
                ...initialTopicsState,
                topicsByCategories: [] as TopicsState["topicsByCategories"],
                topicsByCategoriesLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TopicsActionsType.SET_FOLLOWED_TOPICS,
            topicsReducer(initialTopicsState, {
                type: TopicsActionsType.SET_FOLLOWED_TOPICS,
                payload: [] as TopicsState["followedTopics"]
            }),
            {
                ...initialTopicsState,
                followedTopics: [] as TopicsState["followedTopics"],
                followedTopicsLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TopicsActionsType.SET_NOT_INTERESTED_TOPIC,
            topicsReducer({
                    ...initialTopicsState,
                    topics: [{ id: 2, isTopicNotInterested: false }] as TopicsState["topics"]
                },
                {
                    type: TopicsActionsType.SET_NOT_INTERESTED_TOPIC,
                    payload: { topicsId: 2, isTopicNotInterested: true }
                }),
            {
                ...initialTopicsState,
                topics: [{ id: 2, isTopicNotInterested: true }] as TopicsState["topics"]
            }
        );

        testActionDispatch(
            TopicsActionsType.SET_FOLLOW_TOPIC,
            topicsReducer({
                    ...initialTopicsState,
                    topics: [{ id: 2, isTopicFollowed: false }] as TopicsState["topics"],
                    topicsByCategories: [{
                        topicCategory: TopicCategory.GAMING,
                        topicsByCategories: [{ id: 2, isTopicFollowed: false }]
                    }] as TopicsState["topicsByCategories"]
                },
                {
                    type: TopicsActionsType.SET_FOLLOW_TOPIC,
                    payload: { topicsId: 2, isTopicFollowed: true, topicCategory: TopicCategory.GAMING }
                }),
            {
                ...initialTopicsState,
                topics: [{ id: 2, isTopicFollowed: true }] as TopicsState["topics"],
                topicsByCategories: [{
                    topicCategory: TopicCategory.GAMING,
                    topicsByCategories: [{ id: 2, isTopicFollowed: true }]
                }] as TopicsState["topicsByCategories"]
            }
        );

        testActionDispatch(
            TopicsActionsType.RESET_TOPICS_STATE,
            topicsReducer(
                {
                    ...initialTopicsState,
                    topics: [{ id: 2, isTopicFollowed: false }] as TopicsState["topics"],
                    topicsLoadingState: LoadingStatus.LOADED
                },
                {
                    type: TopicsActionsType.RESET_TOPICS_STATE
                }),
            {
                ...initialTopicsState,
                topics: [],
                topicsLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TopicsActionsType.SET_TOPICS_LOADING_STATE,
            topicsReducer(
                {
                    ...initialTopicsState,
                    topicsLoadingState: LoadingStatus.LOADED
                },
                {
                    type: TopicsActionsType.SET_TOPICS_LOADING_STATE,
                    payload: LoadingStatus.LOADING
                }),
            {
                ...initialTopicsState,
                topics: [],
                topicsLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TopicsActionsType.SET_TOPICS_BY_CATEGORIES_LOADING_STATE,
            topicsReducer(
                {
                    ...initialTopicsState,
                    topicsByCategoriesLoadingState: LoadingStatus.LOADED
                },
                {
                    type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES_LOADING_STATE,
                    payload: LoadingStatus.LOADING
                }),
            {
                ...initialTopicsState,
                topicsByCategoriesLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TopicsActionsType.SET_FOLLOWED_TOPICS_LOADING_STATE,
            topicsReducer(
                {
                    ...initialTopicsState,
                    followedTopicsLoadingState: LoadingStatus.LOADED
                },
                {
                    type: TopicsActionsType.SET_FOLLOWED_TOPICS_LOADING_STATE,
                    payload: LoadingStatus.LOADING
                }),
            {
                ...initialTopicsState,
                followedTopicsLoadingState: LoadingStatus.LOADING
            }
        );
    });
});
