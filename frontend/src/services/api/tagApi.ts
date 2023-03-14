import axios, { AxiosResponse } from "axios";

import { TweetResponse } from "../../types/tweet";
import { TagResponse } from "../../types/tag";
import { FetchTweetsByTagRequest } from "../../store/ducks/tweets/contracts/state";
import { API_TAGS, API_TAGS_SEARCH, API_TAGS_TRENDS } from "../../constants/endpoint-constants";

export const TagApi = {
    async fetchTags(): Promise<AxiosResponse<TagResponse[]>> {
        return await axios.get<TagResponse[]>(API_TAGS);
    },
    async fetchTrends(pageNumber: number): Promise<AxiosResponse<TagResponse[]>> {
        return await axios.get<TagResponse[]>(API_TAGS_TRENDS, { params: { page: pageNumber } });
    },
    async fetchTweetsByTag({ tag }: FetchTweetsByTagRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TAGS_SEARCH, { params: { tagName: tag } });
    }
};
