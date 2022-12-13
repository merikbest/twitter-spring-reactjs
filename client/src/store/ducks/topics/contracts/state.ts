import {LoadingStatus} from "../../../types/common";
import {TopicResponse} from "../../../types/topic";

export interface TopicsState {
    topics: TopicResponse[];
    topicsLoadingState: LoadingStatus;
    topicsByCategories: TopicsByCategoriesResponse[];
    topicsByCategoriesLoadingState: LoadingStatus;
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
