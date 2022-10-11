import {AxiosResponse} from "axios";

import {axios} from "../../core/axios";
import {AddQuoteTweet, AddTweet, ChangeReplyTypeRequest, Vote} from "../../store/ducks/tweets/contracts/state";
import {FetchTweetUsersPayload, ReplyTweet} from "../../store/ducks/tweet/contracts/state";
import {TweetResponse} from "../../store/types/tweet";
import {NotificationTweetResponse} from "../../store/types/notification";
import {UserResponse} from "../../store/types/user";
import {
    API_TWEETS,
    API_TWEETS_CHANGE_REPLY,
    API_TWEETS_FOLLOWER,
    API_TWEETS_LIKE,
    API_TWEETS_LIKED_USERS,
    API_TWEETS_MEDIA,
    API_TWEETS_POOL,
    API_TWEETS_QUOTE,
    API_TWEETS_QUOTES,
    API_TWEETS_REPLIES,
    API_TWEETS_REPLY,
    API_TWEETS_RETWEET,
    API_TWEETS_RETWEETED_USERS,
    API_TWEETS_SCHEDULE,
    API_TWEETS_SEARCH,
    API_TWEETS_VIDEO,
    API_TWEETS_VOTE
} from "../../util/endpoints";

export const TweetApi = {
    async fetchTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS, {params: {page: pageNumber}});
    },
    async fetchMediaTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_MEDIA, {params: {page: pageNumber}});
    },
    async fetchTweetsWithVideo(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_VIDEO, {params: {page: pageNumber}});
    },
    async fetchFollowersTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_FOLLOWER, {params: {page: pageNumber}});
    },
    async fetchScheduledTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_SCHEDULE, {params: {page: pageNumber}});
    },
    async fetchTweetData(tweetId: number): Promise<AxiosResponse<TweetResponse>> {
        return await axios.get<TweetResponse>(`${API_TWEETS}/${tweetId}`);
    },
    async getRepliesByTweetId(tweetId: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_REPLIES(tweetId));
    },
    async getQuotesByTweetId(tweetId: number, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_QUOTES(tweetId), {params: {page: pageNumber}});
    },
    async getLikedUsersByTweetId({tweetId, pageNumber}: FetchTweetUsersPayload): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(API_TWEETS_LIKED_USERS(tweetId), {params: {page: pageNumber}});
    },
    async getRetweetedUsersByTweetId({tweetId, pageNumber}: FetchTweetUsersPayload): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(API_TWEETS_RETWEETED_USERS(tweetId), {params: {page: pageNumber}});
    },
    async createTweet(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(API_TWEETS, request);
    },
    async createPoll(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(API_TWEETS_POOL, request);
    },
    async createScheduledTweet(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(API_TWEETS_SCHEDULE, request);
    },
    async updateScheduledTweet(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.put<TweetResponse>(API_TWEETS_SCHEDULE, request);
    },
    async deleteScheduledTweets(request: { tweetsIds: number[] }): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(API_TWEETS_SCHEDULE, {data: request});
    },
    async deleteTweet(tweetId: number): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(`${API_TWEETS}/${tweetId}`);
    },
    async searchTweets(text: string, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_TWEETS_SEARCH}/${text}`, {params: {page: pageNumber}});
    },
    async likeTweet(tweetId: number): Promise<AxiosResponse<NotificationTweetResponse>> {
        return await axios.get<NotificationTweetResponse>(`${API_TWEETS_LIKE}/${tweetId}`);
    },
    async retweet(tweetId: number): Promise<AxiosResponse<NotificationTweetResponse>> {
        return await axios.get<NotificationTweetResponse>(`${API_TWEETS_RETWEET}/${tweetId}`);
    },
    async replyTweet(request: ReplyTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_TWEETS_REPLY}/${request.tweetId}`, request);
    },
    async quoteTweet(request: AddQuoteTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_TWEETS_QUOTE}/${request.tweetId}`, request);
    },
    async changeTweetReplyType(request: ChangeReplyTypeRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.get<TweetResponse>(`${API_TWEETS_CHANGE_REPLY}/${request.tweetId}`,
            {params: {replyType: request.replyType}});
    },
    async voteInPoll(payload: Vote): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(API_TWEETS_VOTE, payload);
    },
};
