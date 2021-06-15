import {axios} from "../../core/axios";
import {Tweet} from "../../store/ducks/tweets/contracts/state";

interface Response<T> {
    status: string;
    data: T;
}

export const TweetsApi = {
    async fetchTweets(): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>('http://localhost:8080/api/v1/tweets');
        return data.data;
    },
    async fetchTweetData(id: string): Promise<Response<Tweet>> {
        const data = await axios.get<Response<Tweet>>('http://localhost:8080/api/v1/tweets/' + id);
        return data.data;
    },
    async addTweet(payload: string): Promise<Response<Tweet[]>> {
        const data = await axios.post<Response<Tweet[]>>('http://localhost:8080/api/v1/tweets', {text: payload});
        return data.data;
    }
};


