import {axios} from "../../core/axios";
import {Image, Tweet} from "../../store/ducks/tweets/contracts/state";
import {User} from "../../store/ducks/user/contracts/state";
import {API_URL} from "../../util/url";

interface Response<T> {
    status: string;
    data: T;
}

export const TweetApi = {
    async fetchTweets(): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(API_URL + "/tweets");
        return data.data;
    },
    async fetchTweetsByUser(payload: User): Promise<Response<Tweet[]>> {
        const data = await axios.post<Response<Tweet[]>>(API_URL + "/tweets/user", payload);
        return data.data;
    },
    async fetchMediaTweets(): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(API_URL + '/tweets/media');
        return data.data;
    },
    async fetchTweetData(id: string): Promise<Response<Tweet>> {
        const data = await axios.get<Response<Tweet>>(API_URL + '/tweets/' + id);
        return data.data;
    },
    async addTweet(payload: { text: string; images: Image[]; likes: []; retweets: []; }): Promise<Response<Tweet>> {
        const data = await axios.post<Response<Tweet>>(API_URL + '/tweets', payload);
        return data.data;
    },
    async searchTweets(text: string): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(API_URL + '/tweets/search/' + text);
        return data.data;
    },
    async likeTweet(id: string): Promise<Response<Tweet>> {
        const data = await axios.get<Response<Tweet>>(API_URL + '/tweets/like/' + id);
        return data.data;
    },
    async retweet(id: string): Promise<Response<Tweet>> {
        const data = await axios.get<Response<Tweet>>(API_URL + '/tweets/retweet/' + id);
        return data.data;
    },
    async replyTweet(payload: { id: string, text: string; addressedUsername: string;
        images: Image[]; likes: []; retweets: []; }): Promise<Response<Tweet>> {
        const data = await axios.post<Response<Tweet>>(API_URL + `/tweets/reply/${payload.id}`,
            {text: payload.text, addressedUsername: payload.addressedUsername,
                images: payload.images, likes: payload.likes, retweets: payload.retweets,});
        return data.data;
    },
};
