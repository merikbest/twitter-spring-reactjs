import {AxiosResponse} from "axios";

import {axios} from "../../core/axios";
import {AddQuoteTweet, AddTweet, ReplyType, Tweet, Vote} from "../../store/ducks/tweets/contracts/state";
import {API_URL} from "../../util/url";
import {ReplyTweet} from "../../store/ducks/tweet/contracts/state";

interface Response<T> {
    status: string;
    data: T;
}

export const TweetApi = {
    async fetchTweets(payload: number): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(API_URL + "/tweets", {params: {page: payload}});
    },
    async fetchMediaTweets(payload: number): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(API_URL + "/tweets/media", {params: {page: payload}});
    },
    async fetchTweetsWithVideo(payload: number): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(API_URL + "/tweets/video", {params: {page: payload}});
    },
    async fetchScheduledTweets(): Promise<Tweet[]> {
        const {data} = await axios.get<Tweet[]>(API_URL + "/tweets/schedule");
        return data;
    },
    async fetchTweetData(id: string): Promise<Response<Tweet>> {
        const {data} = await axios.get<Response<Tweet>>(API_URL + '/tweets/' + id);
        return data;
    },
    async createTweet(payload: AddTweet): Promise<Response<Tweet>> {
        const {data} = await axios.post<Response<Tweet>>(API_URL + '/tweets', payload);
        return data;
    },
    async createPoll(payload: AddTweet): Promise<Response<Tweet>> {
        const {data} = await axios.post<Response<Tweet>>(API_URL + '/tweets/poll', payload);
        return data;
    },
    async createScheduledTweet(payload: AddTweet): Promise<Response<Tweet>> {
        const {data} = await axios.post<Response<Tweet>>(API_URL + '/tweets/schedule', payload);
        return data;
    },
    async updateScheduledTweet(payload: AddTweet): Promise<Response<Tweet>> {
        const {data} = await axios.put<Response<Tweet>>(API_URL + '/tweets/schedule', payload);
        return data;
    },
    async deleteScheduledTweets(payload: { tweetsIds: number[] }): Promise<Response<string>> {
        const {data} = await axios.delete<Response<string>>(API_URL + '/tweets/schedule', { data: payload });
        return data;
    },
    async deleteTweet(tweetId: string): Promise<Response<string>> {
        const {data} = await axios.delete<Response<string>>(API_URL + '/tweets/' + tweetId);
        return data;
    },
    async searchTweets(text: string): Promise<Response<Tweet[]>> {
        const {data} = await axios.get<Response<Tweet[]>>(API_URL + '/tweets/search/' + text);
        return data;
    },
    async likeTweet(id: string): Promise<Response<Tweet>> {
        const {data} = await axios.get<Response<Tweet>>(API_URL + '/tweets/like/' + id);
        return data;
    },
    async retweet(id: string): Promise<Response<Tweet>> {
        const {data} = await axios.get<Response<Tweet>>(API_URL + '/tweets/retweet/' + id);
        return data;
    },
    async replyTweet(payload: ReplyTweet): Promise<Response<Tweet>> {
        const {data} = await axios.post<Response<Tweet>>(API_URL + `/tweets/reply/${payload.tweetId}`, payload);
        return data;
    },
    async quoteTweet(payload: AddQuoteTweet): Promise<Response<Tweet>> {
        const {data} = await axios.post<Response<Tweet>>(API_URL + `/tweets/quote/${payload.tweetId}`, payload);
        return data;
    },
    async changeTweetReplyType(payload: { tweetId: string; replyType: ReplyType; }): Promise<Response<Tweet>> {
        const {data} = await axios.get<Response<Tweet>>(API_URL + `/tweets/reply/change/${payload.tweetId}`,
            {params: {replyType: payload.replyType}});
        return data;
    },
    async voteInPoll(payload: Vote): Promise<Response<Tweet>> {
        const {data} = await axios.post<Response<Tweet>>(API_URL + "/tweets/vote", payload);
        return data;
    },
};
