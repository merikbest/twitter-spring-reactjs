import axios, { AxiosResponse } from "axios";

import {
    API_TOPICS_CATEGORY,
    API_TOPICS_FOLLOW,
    API_TOPICS_FOLLOWED,
    API_TOPICS_NOT_INTERESTED,
    API_TOPICS_SUGGESTED
} from "../../../constants/endpoint-constants";
import { TopicResponse } from "../../../types/topic";
import {
    SuggestedTopicsRequest,
    TopicsByCategoriesResponse,
    TopicsCategoriesRequest
} from "../../../store/ducks/topics/contracts/state";

export const TopicApi = {
    async getTopicsByIds(request: SuggestedTopicsRequest): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.post<TopicResponse[]>(API_TOPICS_SUGGESTED, request);
    },
    async getTopicsByCategories(request: TopicsCategoriesRequest): Promise<AxiosResponse<TopicsByCategoriesResponse[]>> {
        return await axios.post<TopicsByCategoriesResponse[]>(API_TOPICS_CATEGORY, request);
    },
    async getFollowedTopics(): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.get<TopicResponse[]>(API_TOPICS_FOLLOWED);
    },
    async getFollowedTopicsByUserId(userId: number): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.get<TopicResponse[]>(`${API_TOPICS_FOLLOWED}/${userId}`);
    },
    async getNotInterestedTopics(): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.get<TopicResponse[]>(API_TOPICS_NOT_INTERESTED);
    },
    async processNotInterestedTopic(topicId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_TOPICS_NOT_INTERESTED}/${topicId}`);
    },
    async processFollowTopic(topicId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_TOPICS_FOLLOW}/${topicId}`);
    }
};
