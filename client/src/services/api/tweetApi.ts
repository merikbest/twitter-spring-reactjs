import {AxiosResponse} from "axios";

import {axios} from "../../core/axios";
import {AddQuoteTweet, AddTweet, Vote} from "../../store/ducks/tweets/contracts/state";
import {API_URL} from "../../util/url";
import {ReplyTweet} from "../../store/ducks/tweet/contracts/state";
import {TweetResponse} from "../../store/types/tweet";
import {NotificationTweetResponse} from "../../store/types/notification";
import {UserResponse} from "../../store/types/user";
import {ReplyType} from "../../store/types/common";

export const TweetApi = {
    async fetchTweets(payload: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets`, {params: {page: payload}});
    },
    async fetchMediaTweets(payload: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/media`, {params: {page: payload}});
    },
    async fetchTweetsWithVideo(payload: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/video`, {params: {page: payload}});
    },
    async fetchFollowersTweets(payload: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/follower`, {params: {page: payload}});
    },
    async fetchScheduledTweets(): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/schedule`);
    },
    async fetchTweetData(tweetId: number): Promise<AxiosResponse<TweetResponse>> {
        return await axios.get<TweetResponse>(`${API_URL}/tweets/${tweetId}`);
    },
    async getRepliesByTweetId(tweetId: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/${tweetId}/replies`);
    },
    async getQuotesByTweetId(tweetId: number, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/${tweetId}/quotes`, {params: {page: pageNumber}});
    },
    async getLikedUsersByTweetId(tweetId: number): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/tweets/${tweetId}/liked-users`);
    },
    async getRetweetedUsersByTweetId(tweetId: number): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/tweets/${tweetId}/retweeted-users`);
    },
    async createTweet(payload: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets`, payload);
    },
    async createPoll(payload: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets/poll`, payload);
    },
    async createScheduledTweet(payload: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets/schedule`, payload);
    },
    async updateScheduledTweet(payload: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.put<TweetResponse>(`${API_URL}/tweets/schedule`, payload);
    },
    async deleteScheduledTweets(payload: { tweetsIds: number[] }): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(`${API_URL}/tweets/schedule`, {data: payload});
    },
    async deleteTweet(tweetId: number): Promise<AxiosResponse<TweetResponse>> {
        return await axios.delete<TweetResponse>(`${API_URL}/tweets/${tweetId}`);
    },
    async searchTweets(text: string): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/search/${text}`);
    },
    async likeTweet(tweetId: number): Promise<AxiosResponse<NotificationTweetResponse>> {
        return await axios.get<NotificationTweetResponse>(`${API_URL}/tweets/like/${tweetId}`);
    },
    async retweet(tweetId: number): Promise<AxiosResponse<NotificationTweetResponse>> {
        return await axios.get<NotificationTweetResponse>(`${API_URL}/tweets/retweet/${tweetId}`);
    },
    async replyTweet(payload: ReplyTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets/reply/${payload.tweetId}`, payload);
    },
    async quoteTweet(payload: AddQuoteTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets/quote/${payload.tweetId}`, payload);
    },
    async changeTweetReplyType(payload: { tweetId: number; replyType: ReplyType; }): Promise<AxiosResponse<TweetResponse>> {
        return await axios.get<TweetResponse>(`${API_URL}/tweets/reply/change/${payload.tweetId}`,
            {params: {replyType: payload.replyType}});
    },
    async voteInPoll(payload: Vote): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets/vote`, payload);
    },
};
