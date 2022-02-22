import axios from 'axios';

import {Tag} from '../../store/ducks/tags/contracts/state';
import {Tweet} from "../../store/ducks/tweets/contracts/state";
import {API_URL} from "../../util/url";
import {TweetResponse} from "../../store/types/tweet";

interface Response<T> {
    status: string;
    data: T;
}

export const TagApi = {
    async fetchTags(): Promise<Response<Tag[]>> {
        const {data} = await axios.get<Response<Tag[]>>(`${API_URL}/tags`);
        return data;
    },
    async fetchTrends(): Promise<Response<Tag[]>> {
        const {data} = await axios.get<Response<Tag[]>>(`${API_URL}/tags/trends`);
        return data;
    },
    async fetchTweetsByTag(tag: string): Promise<Response<TweetResponse[]>> { // +
        const {data} = await axios.get<Response<TweetResponse[]>>(`${API_URL}/tags/${tag}`);
        return data;
    },
};
