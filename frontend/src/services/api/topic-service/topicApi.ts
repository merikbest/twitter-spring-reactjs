import axios, { AxiosResponse } from "axios";

import {
    UI_V1_TOPICS_CATEGORY,
    UI_V1_TOPICS_FOLLOW_TOPIC_ID,
    UI_V1_TOPICS_FOLLOWED,
    UI_V1_TOPICS_FOLLOWED_ID,
    UI_V1_TOPICS_NOT_INTERESTED, UI_V1_TOPICS_NOT_INTERESTED_TOPIC_ID,
    UI_V1_TOPICS_SUGGESTED
} from "../../../constants/endpoint-constants";
import { TopicResponse } from "../../../types/topic";
import {
    SuggestedTopicsRequest,
    TopicsByCategoriesResponse,
    TopicsCategoriesRequest
} from "../../../store/ducks/topics/contracts/state";

export const TopicApi = {
    async getTopicsByIds(request: SuggestedTopicsRequest): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.post<TopicResponse[]>(UI_V1_TOPICS_SUGGESTED, request);
    },
    async getTopicsByCategories(request: TopicsCategoriesRequest): Promise<AxiosResponse<TopicsByCategoriesResponse[]>> {
        return await axios.post<TopicsByCategoriesResponse[]>(UI_V1_TOPICS_CATEGORY, request);
    },
    async getFollowedTopics(): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.get<TopicResponse[]>(UI_V1_TOPICS_FOLLOWED);
    },
    async getFollowedTopicsByUserId(userId: number): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.get<TopicResponse[]>(UI_V1_TOPICS_FOLLOWED_ID(userId));
    },
    async getNotInterestedTopics(): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.get<TopicResponse[]>(UI_V1_TOPICS_NOT_INTERESTED);
    },
    async processNotInterestedTopic(topicId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(UI_V1_TOPICS_NOT_INTERESTED_TOPIC_ID(topicId));
    },
    async processFollowTopic(topicId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${UI_V1_TOPICS_FOLLOW_TOPIC_ID}/${topicId}`);
    }
};
