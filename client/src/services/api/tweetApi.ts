import {AxiosResponse} from "axios";

import {axios} from "../../core/axios";
import {AddQuoteTweet, AddTweet, ChangeReplyTypeRequest, Vote} from "../../store/ducks/tweets/contracts/state";
import {API_URL} from "../../util/url";
import {ReplyTweet} from "../../store/ducks/tweet/contracts/state";
import {TweetResponse} from "../../store/types/tweet";
import {NotificationTweetResponse} from "../../store/types/notification";
import {UserResponse} from "../../store/types/user";

export const TweetApi = {
    async fetchTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets`, {params: {page: pageNumber}});
    },
    async fetchMediaTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/media`, {params: {page: pageNumber}});
    },
    async fetchTweetsWithVideo(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/video`, {params: {page: pageNumber}});
    },
    async fetchFollowersTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/follower`, {params: {page: pageNumber}});
    },
    async fetchScheduledTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/schedule`, {params: {page: pageNumber}});
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
    async getLikedUsersByTweetId(tweetId: number, pageNumber: number): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/tweets/${tweetId}/liked-users`, {params: {page: pageNumber}});
    },
    async getRetweetedUsersByTweetId(tweetId: number, pageNumber: number): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/tweets/${tweetId}/retweeted-users`, {params: {page: pageNumber}});
    },
    async createTweet(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets`, request);
    },
    async createPoll(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets/poll`, request);
    },
    async createScheduledTweet(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets/schedule`, request);
    },
    async updateScheduledTweet(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.put<TweetResponse>(`${API_URL}/tweets/schedule`, request);
    },
    async deleteScheduledTweets(request: { tweetsIds: number[] }): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(`${API_URL}/tweets/schedule`, {data: request});
    },
    async deleteTweet(tweetId: number): Promise<AxiosResponse<TweetResponse>> {
        return await axios.delete<TweetResponse>(`${API_URL}/tweets/${tweetId}`);
    },
    async searchTweets(text: string, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/tweets/search/${text}`, {params: {page: pageNumber}});
    },
    async likeTweet(tweetId: number): Promise<AxiosResponse<NotificationTweetResponse>> {
        return await axios.get<NotificationTweetResponse>(`${API_URL}/tweets/like/${tweetId}`);
    },
    async retweet(tweetId: number): Promise<AxiosResponse<NotificationTweetResponse>> {
        return await axios.get<NotificationTweetResponse>(`${API_URL}/tweets/retweet/${tweetId}`);
    },
    async replyTweet(request: ReplyTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets/reply/${request.tweetId}`, request);
    },
    async quoteTweet(request: AddQuoteTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets/quote/${request.tweetId}`, request);
    },
    async changeTweetReplyType(request: ChangeReplyTypeRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.get<TweetResponse>(`${API_URL}/tweets/reply/change/${request.tweetId}`,
            {params: {replyType: request.replyType}});
    },
    async voteInPoll(payload: Vote): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_URL}/tweets/vote`, payload);
    },
};
