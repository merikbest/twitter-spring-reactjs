import axios, { AxiosResponse } from "axios";

import { TweetResponse } from "../../../types/tweet";
import { TagResponse } from "../../../types/tag";
import { FetchTweetsByTagRequest } from "../../../store/ducks/tweets/contracts/state";
import { UI_V1_TAGS, UI_V1_TAGS_SEARCH, UI_V1_TAGS_TRENDS } from "../../../constants/endpoint-constants";

export const TagApi = {
    async getTags(): Promise<AxiosResponse<TagResponse[]>> {
        return await axios.get<TagResponse[]>(UI_V1_TAGS);
    },
    async getTrends(pageNumber: number): Promise<AxiosResponse<TagResponse[]>> {
        return await axios.get<TagResponse[]>(UI_V1_TAGS_TRENDS, { params: { page: pageNumber } });
    },
    async getTweetsByTag({ tag }: FetchTweetsByTagRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TAGS_SEARCH, { params: { tagName: tag } });
    }
};
