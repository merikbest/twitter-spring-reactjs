import axios, {AxiosResponse} from 'axios';

import {API_URL} from "../../util/url";
import {TweetResponse} from "../../store/types/tweet";
import {TagResponse} from "../../store/types/tag";

interface Response<T> {
    status: string;
    data: T;
}

export const TagApi = {
    async fetchTags(): Promise<Response<TagResponse[]>> {
        const {data} = await axios.get<Response<TagResponse[]>>(`${API_URL}/tags`);
        return data;
    },
    async fetchTrends(payload: number): Promise<AxiosResponse<TagResponse[]>> { // TODO fix tests
        return await axios.get<TagResponse[]>(`${API_URL}/tags/trends`, {params: {page: payload}});
    },
    async fetchTweetsByTag(tag: string): Promise<Response<TweetResponse[]>> {
        const {data} = await axios.get<Response<TweetResponse[]>>(`${API_URL}/tags/search`, {params: {tagName: tag}});
        return data;
    },
};
