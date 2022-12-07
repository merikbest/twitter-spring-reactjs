import axios, {AxiosResponse} from "axios";

import {API_TOPICS, API_TOPICS_FOLLOW, API_TOPICS_NOT_INTERESTED} from "../../util/endpoints";
import {TopicResponse} from "../../store/types/topic";

export const TopicApi = {
    async getTopics(): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.get<TopicResponse[]>(API_TOPICS);
    },
    async getTopicsByCategory(topicCategory: string): Promise<AxiosResponse<TopicResponse[]>> {
        return await axios.get<TopicResponse[]>(`${API_TOPICS}/${topicCategory}`);
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
