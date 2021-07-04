import {axios} from "../../core/axios";
import {Image, Tweet} from "../../store/ducks/tweets/contracts/state";
import {User} from "../../store/ducks/user/contracts/state";

interface Response<T> {
    status: string;
    data: T;
}

export const TweetApi = {
    async fetchTweets(): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>('http://localhost:8080/api/v1/tweets');
        return data.data;
    },
    async fetchTweetsByUser(payload: User): Promise<Response<Tweet[]>> {
        const data = await axios.post<Response<Tweet[]>>('http://localhost:8080/api/v1/tweets/user', payload);
        return data.data;
    },

    async fetchTweetData(id: string): Promise<Response<Tweet>> {
        const data = await axios.get<Response<Tweet>>('http://localhost:8080/api/v1/tweets/' + id);
        return data.data;
    },
    async addTweet(payload: { text: string; images: Image[]; likes: []; retweets: []; }): Promise<Response<Tweet>> {
        const data = await axios.post<Response<Tweet>>('http://localhost:8080/api/v1/tweets', payload);
        return data.data;
    },
    async searchTweets(text: string): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>('http://localhost:8080/api/v1/tweets/search/' + text);
        return data.data;
    },
    async likeTweet(id: string): Promise<Response<Tweet>> {
        const data = await axios.get<Response<Tweet>>('http://localhost:8080/api/v1/tweets/like/' + id);
        return data.data;
    },
    async retweet(id: string): Promise<Response<Tweet>> {
        const data = await axios.get<Response<Tweet>>('http://localhost:8080/api/v1/tweets/retweet/' + id);
        return data.data;
    },
    removeTweet: (id: string): Promise<void> => axios.delete('/tweets/' + id),
};
