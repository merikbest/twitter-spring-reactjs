import {axios} from "../../core/axios";
import {AddTweet, ReplyType, Tweet, Vote} from "../../store/ducks/tweets/contracts/state";
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
    async fetchMediaTweets(): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(API_URL + '/tweets/media');
        return data.data;
    },
    async fetchTweetData(id: string): Promise<Response<Tweet>> {
        const data = await axios.get<Response<Tweet>>(API_URL + '/tweets/' + id);
        return data.data;
    },
    async createTweet(payload: AddTweet): Promise<Response<Tweet>> {
        const data = await axios.post<Response<Tweet>>(API_URL + '/tweets', payload);
        return data.data;
    },
    async createPoll(payload: AddTweet): Promise<Response<Tweet>> {
        const data = await axios.post<Response<Tweet>>(API_URL + '/tweets/poll', payload);
        return data.data;
    },
    async deleteTweet(tweetId: string): Promise<Response<string>> {
        const data = await axios.delete<Response<string>>(API_URL + '/tweets/' + tweetId);
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
    async changeTweetReplyType(payload: { tweetId: string; replyType: ReplyType; }): Promise<Response<Tweet>> {
        const data = await axios.get<Response<Tweet>>(API_URL + `/tweets/reply/change/${payload.tweetId}`,
            {params: {replyType: payload.replyType}});
        return data.data;
    },
    async voteInPoll(payload: Vote): Promise<Response<Tweet>> {
        const data = await axios.post<Response<Tweet>>(API_URL + "/tweets/vote", payload);
        return data.data;
    },
};
