import {axios} from "../../core/axios";
import {AddTweet, Tweet} from "../../store/ducks/tweets/contracts/state";
import {User} from "../../store/ducks/user/contracts/state";
import {API_URL} from "../../util/url";
import {ReplyTweet} from "../../store/ducks/tweet/contracts/state";

interface Response<T> {
    status: string;
    data: T;
}

export const TweetApi = {
    async fetchTweets(): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(API_URL + "/tweets");
        return data.data;
    },
    // TODO DELETE (not needed (m.b. no))
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
    async addTweet(payload: AddTweet): Promise<Response<Tweet>> {
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
    async replyTweet(payload: ReplyTweet): Promise<Response<Tweet>> {
        const data = await axios.post<Response<Tweet>>(API_URL + `/tweets/reply/${payload.id}`, payload);
        return data.data;
    },
};
