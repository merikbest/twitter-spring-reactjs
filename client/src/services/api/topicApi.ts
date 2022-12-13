import axios, {AxiosResponse} from "axios";

import {
    API_TOPICS,
    API_TOPICS_CATEGORY,
    API_TOPICS_FOLLOW,
    API_TOPICS_NOT_INTERESTED,
    API_TOPICS_SUGGESTED
} from "../../util/endpoints";
import {TopicResponse} from "../../store/types/topic";
import {
    SuggestedTopicsRequest,
    TopicsByCategoriesResponse,
    TopicsCategoriesRequest
} from "../../store/ducks/topics/contracts/state";

export const TopicApi = {
    async getTopics(): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.get<TopicResponse[]>(API_TOPICS);
    },
    async getTopicsByIds(request: SuggestedTopicsRequest): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.post<TopicResponse[]>(API_TOPICS_SUGGESTED, request);
    },
    async getTopicsByCategories(request: TopicsCategoriesRequest): Promise<AxiosResponse<TopicsByCategoriesResponse[]>> {
        return await axios.post<TopicsByCategoriesResponse[]>(API_TOPICS_CATEGORY, request);
    },
    async getNotInterestedTopics(): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.get<TopicResponse[]>(API_TOPICS_NOT_INTERESTED);
    },
    async addNotInterestedTopic(topicId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_TOPICS_NOT_INTERESTED}/${topicId}`);
    },
    async processFollowTopic(topicId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_TOPICS_FOLLOW}/${topicId}`);
    },
};
