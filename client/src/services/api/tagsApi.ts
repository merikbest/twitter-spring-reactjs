import axios from 'axios';

import {Tag} from '../../store/ducks/tags/contracts/state';
import {Tweet} from "../../store/ducks/tweets/contracts/state";

interface Response<T> {
    status: string;
    data: T;
}

export const TagsApi = {
    async fetchTags(): Promise<Response<Tag[]>> {
        const data = await axios.get<Response<Tag[]>>('http://localhost:8080/api/v1/tags');
        return data.data;
    },
    async fetchTweetsByTag(tag: string): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>('http://localhost:8080/api/v1/tags/' + tag);
        return data.data;
    },
};
