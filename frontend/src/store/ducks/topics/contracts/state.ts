import { LoadingStatus } from "../../../../types/common";
import { TopicCategory, TopicResponse } from "../../../../types/topic";

export interface TopicsState {
    topics: TopicResponse[];
    topicsLoadingState: LoadingStatus;
    followedTopics: TopicResponse[];
    followedTopicsLoadingState: LoadingStatus;
    topicsByCategories: TopicsByCategoriesResponse[];
    topicsByCategoriesLoadingState: LoadingStatus;
}

export interface TopicActionPayload {
    topicsId: number;
    topicCategory?: TopicCategory;
}

export interface NotInterestedTopicPayload extends TopicActionPayload {
    isTopicNotInterested: boolean;
}

export interface FollowedTopicPayload extends TopicActionPayload {
    isTopicFollowed: boolean;
}

export interface SuggestedTopicsRequest {
    topicsIds: number[];
}

export interface TopicsCategoriesRequest {
    categories: string[];
}

export interface TopicsByCategoriesResponse {
    topicCategory: string;
    topicsByCategories: TopicResponse[];
}
