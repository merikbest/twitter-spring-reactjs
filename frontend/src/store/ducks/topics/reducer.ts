import produce, { Draft } from "immer";

import { LoadingStatus } from "../../../types/common";
import { TopicsState } from "./contracts/state";
import { TopicsActions, TopicsActionsType } from "./contracts/actionTypes";

export const initialTopicsState: TopicsState = {
    topics: [],
    topicsLoadingState: LoadingStatus.LOADING,
    followedTopics: [],
    followedTopicsLoadingState: LoadingStatus.LOADING,
    topicsByCategories: [],
    topicsByCategoriesLoadingState: LoadingStatus.LOADING
};

export const topicsReducer = produce((draft: Draft<TopicsState>, action: TopicsActions) => {
    switch (action.type) {
        case TopicsActionsType.SET_TOPICS:
            draft.topics = action.payload;
            draft.topicsLoadingState = LoadingStatus.LOADED;
            break;

        case TopicsActionsType.SET_TOPICS_BY_CATEGORIES:
            draft.topicsByCategories = action.payload;
            draft.topicsByCategoriesLoadingState = LoadingStatus.LOADED;
            break;

        case TopicsActionsType.SET_FOLLOWED_TOPICS:
            draft.followedTopics = action.payload;
            draft.followedTopicsLoadingState = LoadingStatus.LOADED;
            break;

        case TopicsActionsType.SET_NOT_INTERESTED_TOPIC:
            const notInterestedTopicIndex = draft.topics.findIndex((topic) => topic.id === action.payload.topicsId);
            if (notInterestedTopicIndex !== -1) draft.topics[notInterestedTopicIndex].isTopicNotInterested = action.payload.isTopicNotInterested;
            break;

        case TopicsActionsType.SET_FOLLOW_TOPIC:
            const followedTopicIndex = draft.topics.findIndex((topic) => topic.id === action.payload.topicsId);
            if (followedTopicIndex !== -1) draft.topics[followedTopicIndex].isTopicFollowed = action.payload.isTopicFollowed;

            if (action.payload.topicCategory) {
                const topicIndex = draft.topicsByCategories.findIndex((value) => value.topicCategory === action.payload.topicCategory);
                if (topicIndex !== -1) {
                    const followedTopicIndex = draft.topicsByCategories[topicIndex].topicsByCategories.findIndex((topic) => topic.id === action.payload.topicsId);
                    if (followedTopicIndex !== -1) {
                        draft.topicsByCategories[topicIndex].topicsByCategories[followedTopicIndex].isTopicFollowed = action.payload.isTopicFollowed;
                    }
                }
            }
            break;

        case TopicsActionsType.RESET_TOPICS_STATE:
            draft.topics = [];
            draft.topicsLoadingState = LoadingStatus.LOADING;
            draft.followedTopics = [];
            draft.followedTopicsLoadingState = LoadingStatus.LOADING;
            draft.topicsByCategories = [];
            draft.topicsByCategoriesLoadingState = LoadingStatus.LOADING;
            break;

        case TopicsActionsType.SET_TOPICS_LOADING_STATE:
            draft.topicsLoadingState = action.payload;
            break;

        case TopicsActionsType.SET_TOPICS_BY_CATEGORIES_LOADING_STATE:
            draft.topicsByCategoriesLoadingState = action.payload;
            break;

        case TopicsActionsType.SET_FOLLOWED_TOPICS_LOADING_STATE:
            draft.followedTopicsLoadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTopicsState);
